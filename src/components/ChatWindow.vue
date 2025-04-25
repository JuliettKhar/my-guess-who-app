<script setup lang="ts">
import { toRefs } from 'vue'
import aiImg from '@/assets/ai-image.png'
import UserImg from '@/assets/user-image.jpeg'
import robotImg from '@/assets/robot.jpg'

const props = defineProps({ messages: Array })
const { messages } = toRefs(props)
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-xl p-4 h-80 overflow-y-auto shadow-sm mb-4">
    <div v-for="(msg, i) in messages" :key="i" class="mb-2" :id="`message-${i}`">
      <div
        class="message-wrapper"
        :class="msg.role === 'assistant' ? 'text-indigo-600' : 'text-pink-600'"
      >
        <img
          :src="i === 0 ? robotImg : msg.role === 'assistant' && i > 0 ? aiImg : UserImg"
          alt=""
        />
        <p>{{ msg.content }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.message-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  padding: 4px;
  border: 1px solid;
  text-align: left;

  img {
    width: 40px;
  }
}
</style>
