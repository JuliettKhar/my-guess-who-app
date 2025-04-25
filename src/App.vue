<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import CategorySelector from './components/CategorySelector.vue';
import ChatWindow from './components/ChatWindow.vue';
import QuickReplies from './components/QuickReplies.vue';
import animeImg from '@/assets/anime.png';
import matrixImg from '@/assets/movie.png';
import realImg from '@/assets/real.png';
import generalImg from '@/assets/general.png';
import type { IMessage, ISystemPrompts } from '@/types.ts';

const enCategories: string[] = ['Anime Character', 'Real Person', 'Movie Character'];
const jpCategories: string[] = ['アニメキャラクター', '実在の人物', '映画のキャラクター'];
const category = ref('');
const lang = ref('en');
const input = ref('');
const messages = ref<IMessage[]>([]);

const categoriesByLang = computed((): string[] =>
  lang.value === 'en' ? enCategories : jpCategories
);
const dynamicBg = computed((): string => {
  switch (category.value) {
    case 1:
      return animeImg;
    case 2:
      return matrixImg;
    case 3:
      return realImg;
    default:
      return generalImg;
  }
});

const systemPrompts: ISystemPrompts = {
  1: {
    ja: `あなたは「だれでしょう？」というゲームをしています。ユーザーがアニメのキャラクターを思い浮かべています。1回に1つの質問だけをしてください。質問は短く、具体的にしてください。ユーザーの回答を待ってから、次の質問をしてください。15回の質問の後、または自信がある場合にのみ予想してください。質問以外の説明や複数の文は書かないでください。`,
    en: `You are playing a game called “Guess Who?”. The user thinks of an anime character. You must ask only one question at a time to guess who it is. Your questions must be short and focused. Wait for the user's answer before asking the next one. Do not guess until you’ve asked 15 questions or are confident. Do not summarize or say multiple things in one message.`
  },
  2: {
    ja: `あなたは「だれでしょう？」というゲームをしています。ユーザーが実在の人物を思い浮かべています。1回に1つの質問だけをしてください。質問は短く、具体的にしてください。ユーザーの回答を待ってから、次の質問をしてください。15回の質問の後、または自信がある場合にのみ予想してください。質問以外の説明や複数の文は書かないでください。`,
    en: `You are playing a game called “Guess Who?”. The user thinks of a real person. You must ask only one question at a time to guess who it is. Your questions must be short and focused. Wait for the user's answer before asking the next one. Do not guess until you’ve asked 15 questions or are confident. Do not summarize or say multiple things in one message.`
  },
  3: {
    ja: `あなたは「だれでしょう？」というゲームをしています。ユーザーが映画のキャラクターを思い浮かべています。1回に1つの質問だけをしてください。質問は短く、具体的にしてください。ユーザーの回答を待ってから、次の質問をしてください。15回の質問の後、または自信がある場合にのみ予想してください。質問以外の説明や複数の文は書かないでください。`,
    en: `You are playing a game called “Guess Who?”. The user thinks of a movie character. You must ask only one question at a time to guess who it is. Your questions must be short and focused. Wait for the user's answer before asking the next one. Do not guess until you’ve asked 15 questions or are confident. Do not summarize or say multiple things in one message.`
  }
};

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
    <div class="guess-app__header">
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
    <div v-if="!category" class="guess-app__body" :style="!category ? 'flex-direction: row' : ''">
      <CategorySelector :categories="categoriesByLang" :lang="lang" @select="selectCategory" />
    </div>
    <div v-else class="guess-app__body">
      <ChatWindow :messages="messages" />
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

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #cdd2db;
    padding: 20px;
  }

  &__body {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    padding: 20px;
  }
}
</style>
