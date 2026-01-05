<template>
  <div class="min-h-screen bg-gray-50">
    <article v-if="article" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- 返回按钮 -->
      <NuxtLink to="/blog" class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        返回博客列表
      </NuxtLink>

      <!-- 文章头部 -->
      <header class="mb-12">
        <!-- 封面图 -->
        <div v-if="article.cover" class="mb-8 rounded-xl overflow-hidden shadow-lg">
          <img :src="article.cover" :alt="article.title" class="w-full h-96 object-cover" />
        </div>

        <!-- 标题 -->
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {{ article.title }}
        </h1>

        <!-- 描述 -->
        <p class="text-xl text-gray-600 mb-6">
          {{ article.description }}
        </p>

        <!-- 元信息 -->
        <div class="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{{ article.author }}</span>
          </div>
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time>{{ formatDate(article.date) }}</time>
          </div>
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ readingTime }} 分钟阅读</span>
          </div>
        </div>

        <!-- 标签 -->
        <div class="flex flex-wrap gap-2">
          <span v-for="tag in article.tags" :key="tag" class="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
            #{{ tag }}
          </span>
        </div>
      </header>

      <!-- 文章内容 -->
      <div class="prose prose-lg prose-blue max-w-none bg-white rounded-xl shadow-md p-8 md:p-12">
        <ContentRenderer :value="article">
          <template #empty>
            <p class="text-gray-500">内容加载中...</p>
          </template>
        </ContentRenderer>
      </div>

      <!-- 文章底部 -->
      <footer class="mt-12 pt-8 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <NuxtLink to="/blog"
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            查看更多文章
          </NuxtLink>

          <!-- 分享按钮 -->
          <div class="flex items-center gap-3">
            <span class="text-gray-600 text-sm">分享：</span>
            <button @click="shareOnTwitter" class="p-2 text-gray-600 hover:text-blue-500 transition-colors"
              title="分享到 Twitter">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </button>
            <button @click="copyLink" class="p-2 text-gray-600 hover:text-blue-500 transition-colors" title="复制链接">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </article>

    <!-- 加载状态 -->
    <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <p class="text-gray-500">文章加载中...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogArticle } from '~/types/content'

const route = useRoute()
const slug = route.params.slug as string

// 查询文章内容
const { data: article } = await useAsyncData(`blog-${slug}`, () =>
  (queryCollection as any)('blog').path(`/blog/${slug}`).first() as Promise<BlogArticle | null>
)

// 计算阅读时间（简单估算：每分钟 200 字）
const readingTime = computed(() => {
  if (!article.value) return 5
  const text = JSON.stringify(article.value)
  const words = text.length
  return Math.ceil(words / 200 / 2) // 中文字符除以2
})

// 格式化日期
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 分享到 Twitter
const shareOnTwitter = () => {
  const url = window.location.href
  const text = article.value?.title || ''
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
}

// 复制链接
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    alert('链接已复制到剪贴板！')
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// SEO 元数据
useHead({
  title: () => article.value?.title ? `${article.value.title} - MeanC Blog` : 'MeanC Blog',
  meta: [
    {
      name: 'description',
      content: () => article.value?.description || ''
    },
    {
      property: 'og:title',
      content: () => article.value?.title || ''
    },
    {
      property: 'og:description',
      content: () => article.value?.description || ''
    },
    {
      property: 'og:image',
      content: () => article.value?.cover || ''
    }
  ]
})
</script>

<style>
/* Prose 样式增强 */
.prose {
  color: #374151;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  color: #111827;
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 1em;
}

.prose h1 {
  font-size: 2.25em;
}

.prose h2 {
  font-size: 1.875em;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.3em;
}

.prose h3 {
  font-size: 1.5em;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  font-size: 0.875em;
  color: #e11d48;
}

.prose pre {
  background-color: #1f2937;
  color: #f9fafb;
  border-radius: 0.5em;
  padding: 1em;
  overflow-x: auto;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
  color: inherit;
  font-size: 0.875em;
}

.prose blockquote {
  border-left: 4px solid #3b82f6;
  padding-left: 1em;
  font-style: italic;
  color: #6b7280;
  background-color: #f9fafb;
  padding: 1em;
  border-radius: 0.25em;
}

.prose a {
  color: #3b82f6;
  text-decoration: none;
}

.prose a:hover {
  color: #2563eb;
  text-decoration: underline;
}

.prose ul,
.prose ol {
  padding-left: 1.5em;
}

.prose li {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.prose img {
  border-radius: 0.5em;
  margin: 2em 0;
}

.prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 2em 0;
}

.prose th,
.prose td {
  border: 1px solid #e5e7eb;
  padding: 0.75em;
  text-align: left;
}

.prose th {
  background-color: #f3f4f6;
  font-weight: 600;
}
</style>
