<template>
  <div>
    <!-- Hero 部分 -->
    <section class="min-h-screen w-full relative pt-20 pb-16">
      <!-- 背景 -->
      <div class="fixed inset-0 pointer-events-none z-0" :style="{
        backgroundImage: 'linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%), linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)',
        backgroundSize: '40px 40px',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 0% 100%, #000 50%, transparent 90%)',
        maskImage: 'radial-gradient(ellipse 80% 80% at 0% 100%, #000 50%, transparent 90%)'
      }" />

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Intro />
      </div>
    </section>

    <!-- 博客预览部分 -->
    <section class="relative z-10 py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogList :limit="3" />
      </div>
    </section>

    <!-- CTA 部分 -->
    <section class="relative z-10 py-16 bg-gradient-to-r from-blue-500 to-purple-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">探索更多技术内容</h2>
        <p class="text-xl text-blue-100 mb-8">持续分享前端开发、Vue、Nuxt 等技术文章</p>
        <UButton to="/blog" class="text-blue-600">
          浏览所有文章
        </UButton>
      </div>
    </section>

    <!-- Footer -->
    <PartFooter />
  </div>
</template>

<script setup lang="ts">
import Intro from '~/part/Hero.vue'
import BlogList from '~/components/BlogList.vue'
import PartFooter from '~/part/Footer.vue'

useHead({
  title: 'MeanC Blog',
  meta: [
    {
      name: 'description',
      content: '一个使用 Nuxt 3 构建的技术博客，分享前端开发、Vue、TypeScript 等技术文章'
    }
  ]
})
</script>
