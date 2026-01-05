<script setup lang="ts">
const { siteConfig } = useRuntimeConfig().public
</script>

<template>
  <section class="min-h-screen flex items-center justify-center px-4 py-20 relative">
    <!-- 主内容 -->
    <div class="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
      <!-- 左侧文本内容 -->
      <div class="text-primary space-y-8 lg:col-span-2">
        <!-- 欢迎语 -->
        <div>
          <h1 class="text-5xl md:text-6xl font-bold mb-2">
            Hi, I'm <span class="inline-block">{{ siteConfig.site.author }}</span>
          </h1>
        </div>

        <!-- 专业技能描述 -->
        <p class="text-secondary text-lg leading-relaxed">
          Specialized in Vue, TypeScript, and building accessible, high-performance web applications.
        </p>

        <!-- 社交媒体图标 -->
        <div class="pt-4">
          <SocialLinks />
        </div>
      </div>

      <!-- 右侧头像 -->
      <div class="flex justify-center lg:justify-end lg:col-span-1">
        <div class="relative w-64 h-64 lg:w-80 lg:h-80">
          <!-- 头像容器 -->
          <img :src="siteConfig.site.logo" :alt="siteConfig.site.author"
            class="relative w-full h-full squircle-mask shadow-2xl object-cover" />
        </div>
      </div>
    </div>

    <!-- 底部提示 -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 dark:text-gray-500 text-center">
      <p class="text-sm">小舟从此逝，江海寄余生。</p>
      <svg class="mt-4 w-6 h-6 mx-auto animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  </section>
</template>

<style scoped>
/* Styles removed as wave animation is no longer needed */
</style>
