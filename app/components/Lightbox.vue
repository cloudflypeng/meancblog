<template>
  <Transition name="fade">
    <div v-if="modelValue" class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      @click="$emit('update:modelValue', false)">
      <div class="relative max-w-6xl w-full" @click.stop>
        <!-- 关闭按钮（左侧，使用 UButton，带边框） -->
        <UButton icon="i-heroicons-x-mark" size="md" variant="ghost"
          class="absolute top-2 left-2 border border-white/30 text-white hover:bg-white/10"
          @click="$emit('update:modelValue', false)">关闭</UButton>

        <!-- 上一张按钮 -->
        <button
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          @click="$emit('previous')" aria-label="Previous">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- 内容容器 - 左右排列 -->
        <div class="flex flex-col md:flex-row gap-6 md:gap-8 items-start max-h-[70vh]">
          <!-- 图片 -->
          <div class="flex-1 min-w-0 h-full flex items-center justify-center">
            <img :src="image.url" :alt="image.title" class="max-w-full max-h-[70vh] object-contain" />
          </div>

          <!-- 文字信息（去除边框、背景，仅文字展示） -->
          <div class="md:w-96 w-full shrink-0">
            <div>
              <h2 class="text-white text-2xl font-semibold mb-3">{{ image.title }}</h2>
              <p class="text-gray-300 text-sm leading-relaxed mb-4">{{ image.description }}</p>
            </div>
          </div>
        </div>

        <!-- 下一张按钮 -->
        <button
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          @click="$emit('next')" aria-label="Next">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface LightboxImage {
  id: number
  url: string
  title: string
  description: string
  aspectRatio: string
}

defineProps<{
  modelValue: boolean
  image: LightboxImage
  currentIndex: number
  total: number
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
  'previous': []
  'next': []
}>()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
