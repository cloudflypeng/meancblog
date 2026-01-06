<template>
  <div class="min-h-screen">
    <!-- 文章头部 -->
    <article v-if="article" class="py-20 px-4">
      <div class="max-w-3xl mx-auto">
        <!-- 返回按钮 -->
        <NuxtLink to="/blog"
          class="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-8 group">
          <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          返回博客列表
        </NuxtLink>

        <!-- 文章标题 -->
        <h1 class="text-5xl font-bold mb-6 leading-tight">{{ article.title }}</h1>

        <!-- 文章元信息 -->
        <div
          class="flex flex-wrap items-center gap-6 text-secondary text-sm mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{{ article.author }}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time>{{ formatDate(article.date) }}</time>
          </div>
          <div v-if="article.tags && article.tags.length" class="flex items-center gap-2 flex-wrap">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span v-for="tag in article.tags" :key="tag"
              class="px-2.5 py-1 text-xs border border-gray-200 dark:border-gray-800 rounded-full">
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- 封面图 -->
        <div v-if="article.cover" class="mb-12 rounded-2xl overflow-hidden">
          <img :src="article.cover" :alt="article.title" class="w-full h-auto object-cover" />
        </div>

        <!-- 文章描述 -->
        <div v-if="article.description"
          class="text-xl text-secondary leading-relaxed mb-12 p-6 border-l-4 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-r-lg">
          {{ article.description }}
        </div>

        <!-- 文章内容 -->
        <div class="prose prose-lg dark:prose-invert max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-4xl prose-h1:mb-4
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-code:text-primary prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
          prose-img:rounded-xl prose-img:shadow-lg
          prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-900 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
          prose-ul:my-6 prose-ol:my-6
          prose-li:my-2">
          <ContentRenderer :value="article" />
        </div>

        <!-- 文章底部导航 -->
        <div class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div class="flex items-center justify-between gap-4">
            <NuxtLink v-if="prev" :to="prev.path"
              class="group flex-1 p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 transition-all">
              <div class="text-xs text-tertiary mb-1">上一篇</div>
              <div class="font-semibold group-hover:text-primary transition-colors line-clamp-1">{{ prev.title }}</div>
            </NuxtLink>
            <NuxtLink v-if="next" :to="next.path"
              class="group flex-1 p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 transition-all text-right">
              <div class="text-xs text-tertiary mb-1">下一篇</div>
              <div class="font-semibold group-hover:text-primary transition-colors line-clamp-1">{{ next.title }}</div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </article>

    <!-- 404 状态 -->
    <div v-else class="min-h-[60vh] flex items-center justify-center px-4">
      <div class="text-center">
        <h1 class="text-6xl font-bold mb-4">404</h1>
        <p class="text-xl text-secondary mb-8">文章未找到</p>
        <NuxtLink to="/blog"
          class="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-full hover:border-gray-500 dark:hover:border-gray-500 transition-colors">
          返回博客列表
        </NuxtLink>
      </div>
    </div>

    <!-- Footer -->
    <PartFooter />
  </div>
</template>

<script setup lang="ts">
import type { BlogArticle } from '~/types/content'
import PartFooter from '~/part/Footer.vue'

const route = useRoute()
const slug = route.params.slug as string

// 获取当前文章
const { data: article } = await useAsyncData(`blog-${slug}`, async () => {
  return queryCollection('blog').path(`/blog/${slug}`).first()
})

// 获取所有文章用于上下篇导航
const { data: allArticles } = await useAsyncData('all-blog-articles', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

// 计算上一篇和下一篇
const currentIndex = computed(() => {
  return allArticles.value?.findIndex(a => a.path === article.value?.path) ?? -1
})

const prev = computed(() => {
  if (currentIndex.value > 0 && allArticles.value) {
    return allArticles.value[currentIndex.value - 1]
  }
  return null
})

const next = computed(() => {
  if (currentIndex.value >= 0 && currentIndex.value < (allArticles.value?.length ?? 0) - 1 && allArticles.value) {
    return allArticles.value[currentIndex.value + 1]
  }
  return null
})

// 格式化日期
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// SEO
useHead({
  title: article.value?.title ?? '文章详情',
  meta: [
    {
      name: 'description',
      content: article.value?.description ?? ''
    },
    {
      property: 'og:title',
      content: article.value?.title ?? ''
    },
    {
      property: 'og:description',
      content: article.value?.description ?? ''
    },
    {
      property: 'og:image',
      content: article.value?.cover ?? ''
    }
  ]
})
</script>

<style>
/* 确保代码块可以横向滚动 */
.prose pre {
  overflow-x: auto;
}

/* line-clamp utility */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
