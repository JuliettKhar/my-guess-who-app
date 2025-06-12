<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import CategorySelector from './components/CategorySelector.vue';
import ChatWindow from './components/ChatWindow.vue';
import QuickReplies from './components/QuickReplies.vue';
import type { IMessage } from '@/types';
import { systemPrompts } from '@/utils/systemPrompts';

const enCategories: string[] = ['Anime Character', 'Real Person', 'Movie Character'];
const jpCategories: string[] = ['アニメキャラクター', '実在の人物', '映画のキャラクター'];
const category = ref<number | null>(null);
const lang = ref<'ja' | 'en'>('en');
const input = ref('');
const messages = ref<IMessage[]>([]);
const isAnswerLoading = ref(false);
const apiKey = ref('');

const categoriesByLang = computed((): string[] =>
  lang.value === 'en' ? enCategories : jpCategories
);

const selectCategory = (c: number) => {
  category.value = c;
  messages.value = [{ role: 'system', content: systemPrompts[c][lang.value] }];
  fetchNextQuestion();
};

const getApiKey = () => {
  if (sessionStorage.getItem('apiKey')) {
    apiKey.value = sessionStorage.getItem('apiKey') as string;
    fetchNextQuestion();
    return;
  }

  if (/^sk-[a-zA-Z0-9-_]{10,}$/.test(apiKey.value)) {
    sessionStorage.setItem('a_key', apiKey.value);
    fetchNextQuestion();
  } else {
    window.alert('Wrong API Key!');
  }
};

const quickReply = (text: string) => {
  messages.value.push({ role: 'user', content: text });
  scrollToMessage();
  fetchNextQuestion();
};

const sendMessage = () => {
  if (!input.value.trim()) {
    return;
  }
  if (!apiKey.value) {
    window.alert('Wrong API Key!');
    return;
  }

  messages.value.push({ role: 'user', content: input.value });
  fetchNextQuestion();
  scrollToMessage();
  input.value = '';
};

const scrollToMessage = () => {
  setTimeout(() => {
    const currMessage = document.getElementById(`message-${messages.value.length - 1}`);
    currMessage?.scrollIntoView({ behavior: 'smooth' });
  }, 0);
};

const fetchNextQuestion = async () => {
    try {
      isAnswerLoading.value = true;
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.MODE !== 'production' ? import.meta.env.VITE_API_KEY : apiKey.value}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: messages.value
        })
      });

      if (!res.ok) {
        const resp = await res.json();
        const err = resp.error.message.split('.')[0];
        throw Error(err ||  'Something went wrong.' );
      }

      const data = await res.json();
      isAnswerLoading.value = false;
      messages.value.push({ role: 'assistant', content: data.choices[0].message.content });
      scrollToMessage();
    } catch (error: any) {
      messages.value.push({ role: 'assistant', content: error.message });
    }
  };

  const reset = () => {
    category.value = null;
    input.value = '';
    messages.value = [];
  };

  onMounted(() => {
    const url = new URL(document.location.toString());
    const searchParams = new URLSearchParams(url.search);

    if (searchParams.get('key')) {
      apiKey.value = searchParams.get('key') as string;
    }
  })


  onBeforeUnmount(() => {
    reset();
  });
</script>

<template>
  <div class="guess-app main-container drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
    <div class="guess-app__header" :style="!category ? 'padding-bottom:20px' : 'padding-bottom:0'">
      <h1 class="sm:text-sm md:text-3xl font-bold text-center text-indigo-700">
        {{ lang === 'ja' ? '「だれでしょう？」' : 'Guess Who?' }}
      </h1>
      <div class="flex justify-end">
        <select
          v-if="!category"
          v-model="lang"
          class="border border-gray-300 rounded-xl px-2 py-2 text-sm text-gray-500"
        >
          <option value="en">🇬🇧 English</option>
          <option value="ja">🇯🇵 日本語</option>
        </select>
      </div>
    </div>
    <div v-if="!category" class="guess-app__body">
      <p class="sm:text-sm text-center text-pink-500">
        {{
          lang === 'ja'
            ? 'カテゴリーを選んで、誰かを思い浮かべてください！私は当ててみます。'
            : 'Think of someone from the selected category — I’ll guess who it is!'
        }}
      </p>
      <CategorySelector :categories="categoriesByLang" :lang="lang" @select="selectCategory" />
    </div>
    <div
      v-else
      class="guess-app__body"
      :style="!category ? 'flex-direction: row' : 'flex-direction: column'"
    >
      <ChatWindow :messages="messages" :loader="isAnswerLoading" :lang="lang" />
      <QuickReplies :lang="lang" @reply="quickReply" />
      <div class="flex gap-2">
        <input
          v-model="input"
          @keydown.enter="sendMessage"
          :placeholder="lang === 'ja' ? '答えを入力してください…' : 'Type your answer...'"
          class="flex-1 border border-gray-300 rounded-xl px-4 py-2"
        />
        <button @click="sendMessage" class="bg-indigo-500 text-white rounded-xl px-4">
          {{ lang === 'ja' ? '送信' : 'Send' }}
        </button>
      </div>
      <button @click="reset" class="mt-4 text-sm text-gray-500 bg-gray-200">
        {{ lang === 'ja' ? 'オーバー' : 'Over' }}
      </button>
    </div>
    <form class="guess-app__footer" v-if="category" @click.prevent>
      <span class="text-gray-700 dark:text-gray-200 text-sm">API key:</span>
      <input type="password" v-model.trim="apiKey" />
      <button @click="getApiKey">{{ lang === 'ja' ? '送信' : 'Send' }}</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.guess-app {
  display: flex;
  flex: 1;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  align-items: center;
  flex-direction: column;
  border-radius: 22px;
  transition: box-shadow 0.3s ease;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #cdd2db;
    padding: 20px;

    @media (max-width: 600px) {
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      padding: 20px 20px 0;
    }

    h1 {
      background: linear-gradient(to right, #a855f7, #f43f5e);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    padding: 20px;
    gap: 10px;

    @media (min-width: 600px) {
      flex-direction: row;
    }
  }

  &__footer {
    gap: 5px;
    padding: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid #cdd2db;

    input {
      border: 1px solid gray;
      border-radius: 5px;
      padding: 0 5px;
    }

    button {
      padding: 0.6rem;
    }
  }
}
</style>
