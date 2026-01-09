<template>
  <div>
    <!-- Hero 部分 -->
    <Intro />

    <!-- 博客预览部分 -->
    <section class="py-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogList :limit="3" />
        <div class="text-center mt-12">
          <NuxtLink to="/blog"
            class="inline-block px-6 py-3 border-2 font-semibold rounded-lg transition-all hover:scale-110">
            View All Articles
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Intro from '~/part/Hero.vue'
import BlogList from '~/components/BlogList.vue'

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
