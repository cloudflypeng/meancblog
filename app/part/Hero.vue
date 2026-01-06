<script setup lang="ts">
const { siteConfig } = useRuntimeConfig().public

const isVisible = ref(false)

onMounted(() => {
  // 使用 requestAnimationFrame 确保 DOM 已渲染
  requestAnimationFrame(() => {
    isVisible.value = true
  })
})
</script>

<template>
  <section class="min-h-screen flex items-center justify-center px-4 py-20 relative">
    <!-- 主内容 -->
    <div class="relative z-10 max-w-5xl w-full flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
      <!-- 左侧文本内容 -->
      <Transition enter-active-class="transition-all duration-1000 ease-out"
        enter-from-class="opacity-0 -translate-x-12" enter-to-class="opacity-100 translate-x-0">
        <div v-show="isVisible" class="text-primary space-y-6 lg:space-y-8 lg:col-span-2 text-center lg:text-left">
          <!-- 欢迎语 -->
          <div>
            <h1 class="text-2xl md:text-3xl font-bold mb-2">
              Hi, I'm <span class="inline-block">{{ siteConfig.site.author }}</span>
            </h1>
          </div>

          <!-- 专业技能描述 -->
          <p class="text-secondary text-lg leading-relaxed">
            Specialized in Vue, React, TypeScript, and building accessible, high-performance web applications.
          </p>

          <!-- 社交媒体图标 -->
          <div class="pt-4">
            <SocialLinks />
          </div>
        </div>
      </Transition>

      <!-- 右侧头像 -->
      <Transition enter-active-class="transition-all duration-1000 ease-out delay-300"
        enter-from-class="opacity-0 translate-x-12 scale-90" enter-to-class="opacity-100 translate-x-0 scale-100">
        <div v-show="isVisible" class="flex justify-center lg:justify-end lg:col-span-1 order-first lg:order-last">
          <div class="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-80 lg:h-80">
            <!-- 头像容器 -->
            <img :src="siteConfig.site.logo" :alt="siteConfig.site.author"
              class="relative w-full h-full squircle-mask shadow-2xl object-cover" />
          </div>
        </div>
      </Transition>
    </div>

    <!-- 底部提示 -->
    <Transition enter-active-class="transition-all duration-1000 ease-out delay-500"
      enter-from-class="opacity-0 translate-y-8" enter-to-class="opacity-100 translate-y-0">
      <div v-show="isVisible"
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 dark:text-gray-500 text-center">
        <p class="text-sm">小舟从此逝,江海寄余生。</p>
        <svg class="mt-4 w-6 h-6 mx-auto animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </Transition>

    <!-- outline 背景融合 -->
    <Transition enter-active-class="transition-all duration-1500 ease-out" enter-from-class="opacity-0 translate-x-32"
      enter-to-class="translate-x-0">
      <div v-show="isVisible" class="hidden lg:block absolute bottom-0 right-10 outline-text text-[100px] opacity-10">
        MEANC
      </div>
    </Transition>
  </section>
</template>

<style scoped>
/* Styles removed as wave animation is no longer needed */
</style>
