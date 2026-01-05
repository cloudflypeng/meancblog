<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const progress = ref(0)
const isLoading = ref(false)
let progressInterval: ReturnType<typeof setInterval> | null = null

const router = useRouter()

// 开始进度
const start = () => {
  if (isLoading.value) return

  isLoading.value = true
  progress.value = 10

  // 模拟进度，逐步增长但速度递减
  progressInterval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.random() * 30
    }
  }, 200)
}

// 完成进度
const finish = () => {
  if (progressInterval) clearInterval(progressInterval)
  progress.value = 100

  // 动画完成后隐藏
  setTimeout(() => {
    isLoading.value = false
    progress.value = 0
  }, 300)
}

// 监听路由变化
router.beforeEach(() => {
  start()
  return true
})

router.afterEach(() => {
  finish()
})
</script>

<template>
  <Transition name="progress" @enter="(el) => { }" @leave="(el) => { }">
    <div v-if="isLoading || progress > 0"
      class="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg z-[9999]"
      :style="{ width: progress + '%' }" style="transition: width 0.3s ease" />
  </Transition>
</template>

<style scoped>
.progress-enter-active,
.progress-leave-active {
  transition: opacity 0.3s ease;
}

.progress-enter-from,
.progress-leave-to {
  opacity: 0;
}
</style>
