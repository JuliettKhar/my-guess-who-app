<script setup lang="ts">
defineProps({
  categories: Array,
  lang: String
});
defineEmits(['select']);
</script>

<template>
  <div class="flex flex-col gap-3">
    <p class="text-center text-lg font-medium text-gray-700 dark:text-gray-200">
      {{ lang === 'ja' ? 'カテゴリーを選んでください：' : 'Choose a category:' }}
    </p>
    <button
      v-for="(c, index) in categories"
      :key="index"
      @click="$emit('select', index + 1)"
      class="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
    >
      <span v-if="index + 1 === 1">🎌 {{ c }}</span>
      <span v-else-if="index + 1 === 2">🧑‍🤝‍🧑️ {{ c }}</span>
      <span v-else>🎬 {{ c }}</span>
    </button>
  </div>
</template>

<style scoped lang="scss"></style>
