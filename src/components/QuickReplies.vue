<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = defineProps({ lang: String })
defineEmits(['reply'])

const { lang } = toRefs(props)
const yesText = computed(() => (lang.value === 'ja' ? 'はい' : 'Yes'))
const noText = computed(() => (lang.value === 'ja' ? 'いいえ' : 'No'))
const unsureText = computed(() => (lang.value === 'ja' ? 'わからない' : "I don't know"))
</script>

<template>
  <div class="flex flex-wrap gap-2 justify-center my-4">
    <button
      @click="$emit('reply', yesText)"
      class="px-4 py-2 rounded-xl border bg-gray-100 hover:bg-gray-100"
    >
      {{ yesText }}
    </button>
    <button
      @click="$emit('reply', noText)"
      class="px-4 py-2 rounded-xl border bg-gray-100 hover:bg-gray-100"
    >
      {{ noText }}
    </button>
    <button
      @click="$emit('reply', unsureText)"
      class="px-4 py-2 rounded-xl border bg-gray-100 hover:bg-gray-100"
    >
      {{ unsureText }}
    </button>
  </div>
</template>

<style scoped lang="scss"></style>
