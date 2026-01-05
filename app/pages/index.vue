<template>
  <div>
    <!-- Hero 部分 -->
    <div class="min-h-screen w-full bg-white relative">
      <!-- 背景 -->
      <div class="absolute inset-0" :style="{
        backgroundImage: 'linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%), linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)',
        backgroundSize: '40px 40px',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 0% 100%, #000 50%, transparent 90%)',
        maskImage: 'radial-gradient(ellipse 80% 80% at 0% 100%, #000 50%, transparent 90%)'
      }" />
      <Intro />
    </div>

    <!-- 博客预览部分 -->
    <BlogList :limit="3" />

    <!-- CTA 部分 -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">探索更多技术内容</h2>
        <p class="text-xl text-blue-100 mb-8">
          持续分享前端开发、Vue、Nuxt 等技术文章
        </p>
        <NuxtLink to="/blog"
          class="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
          浏览所有文章
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-gray-400">
            © {{ new Date().getFullYear() }} MeanC Blog. 使用 Nuxt 3 + @nuxt/content 构建
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Intro from '~/components/Intro.vue'
import BlogList from '~/components/BlogList.vue'

useHead({
  title: 'MeanC Blog - 技术分享与开发经验',
  meta: [
    {
      name: 'description',
      content: '一个使用 Nuxt 3 构建的技术博客，分享前端开发、Vue、TypeScript 等技术文章'
    }
  ]
})
</script>
