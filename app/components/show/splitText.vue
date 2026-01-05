<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  texts: string[]
}>()

const showText = ref('')
const isRunning = ref(true)

const typeWriter = async (str: string) => {
  const len = str.length
  let cur = 0
  while (cur <= len && isRunning.value) {
    // 将 index > cur 的部分改成.
    const curStr = str.slice(0, cur) + '.'.repeat(len - cur)
    showText.value = curStr
    // sleep 500ms
    await new Promise(resolve => setTimeout(resolve, 50))
    cur++
  }

  return new Promise(resolve => setTimeout(resolve, 1000))
}

onMounted(async () => {
  let index = 0
  while (isRunning.value) {
    const str = props.texts[index] ?? '...'
    await typeWriter(str)
    index++
    index = index % props.texts.length
  }
})

onUnmounted(() => {
  isRunning.value = false
})
</script>
<template>
  <span>{{ showText }}</span>
</template>
