<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import CategorySelector from './components/CategorySelector.vue';
import ChatWindow from './components/ChatWindow.vue';
import QuickReplies from './components/QuickReplies.vue';
import type { IMessage } from '@/types.ts';
import { getBackgroundUrl } from '@/utils/getBackgroundUrl.ts';
import { systemPrompts } from '@/utils/systemPrompts.ts';

const enCategories: string[] = ['Anime Character', 'Real Person', 'Movie Character'];
const jpCategories: string[] = ['アニメキャラクター', '実在の人物', '映画のキャラクター'];
const category = ref('');
const lang = ref('en');
const input = ref('');
const messages = ref<IMessage[]>([]);
const isAnswerLoading = ref(false);

const categoriesByLang = computed((): string[] =>
  lang.value === 'en' ? enCategories : jpCategories
);
const dynamicBg = computed((): string => getBackgroundUrl(category.value));

const updateBg = () =>
  document.documentElement.style.setProperty('--guess-bg-url', `url('${dynamicBg.value}')`);

const selectCategory = (c: number) => {
  category.value = c;
  messages.value = [{ role: 'system', content: systemPrompts[c][lang.value] }];
  fetchNextQuestion();
};

const quickReply = (text: string) => {
  messages.value.push({ role: 'user', content: text });
  scrollToMessage();
  fetchNextQuestion();
};

const sendMessage = () => {
  if (!input.value.trim()) return;
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
  isAnswerLoading.value = true;
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: messages.value
    })
  });
  const data = await res.json();
  isAnswerLoading.value = false;
  messages.value.push({ role: 'assistant', content: data.choices[0].message.content });
  scrollToMessage();
};

const reset = () => {
  category.value = '';
  input.value = '';
  messages.value = [];
};

watch(category, () => {
  updateBg();
});
</script>

<template>
  <div class="guess-app">
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
      <CategorySelector :categories="categoriesByLang" :lang="lang" @select="selectCategory" />
    </div>
    <div
      v-else
      class="guess-app__body"
      :style="!category ? 'flex-direction: row' : 'flex-direction: column'"
    >
      <ChatWindow :messages="messages" :loader="isAnswerLoading" />
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
  </div>
</template>

<style scoped lang="scss">
.guess-app {
  display: flex;
  flex: 1;
  border-radius: 50px;
  border: 1px solid #cdd2db;
  background: white;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);

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
  }

  &__body {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    padding: 20px;

    @media (min-width: 600px) {
      flex-direction: row;
    }
  }
}
</style>
