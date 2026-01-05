<template>
  <div class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 标题 -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">最新博客</h2>
        <p class="text-gray-600">探索最新的技术文章和开发经验</p>
      </div>

      <!-- 博客列表 -->
      <div v-if="articles && articles.length > 0" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article v-for="article in displayArticles" :key="article.path"
          class="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <NuxtLink :to="article.path" class="block">
            <!-- 封面图 -->
            <div class="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
              <img v-if="article.cover" :src="article.cover" :alt="article.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <div v-else class="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                {{ article.title.charAt(0) }}
              </div>
            </div>

            <!-- 文章信息 -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {{ article.title }}
              </h3>

              <p class="text-gray-600 mb-4 line-clamp-2 text-sm">
                {{ article.description }}
              </p>

              <!-- 标签 -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="tag in article.tags?.slice(0, 3)" :key="tag"
                  class="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">
                  {{ tag }}
                </span>
              </div>

              <!-- 元信息 -->
              <div class="flex items-center justify-between text-xs text-gray-500">
                <span>{{ article.author }}</span>
                <time>{{ formatDate(article.date) }}</time>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>

      <!-- 查看更多按钮 -->
      <div v-if="articles && articles.length > limit" class="text-center mt-12">
        <NuxtLink to="/blog"
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          查看所有文章
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>

      <!-- 空状态 -->
      <div v-else-if="!articles || articles.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-gray-500 text-lg">暂无文章发布</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogArticle } from '~/types/content'

interface Props {
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  limit: 6
})

// 查询博客文章
const { data: articles } = await useAsyncData('blog-preview', () =>
  (queryCollection as any)('blog')
    .order('date', 'DESC')
    .all() as Promise<BlogArticle[]>
)

// 限制显示数量
const displayArticles = computed(() => {
  return articles.value?.slice(0, props.limit) || []
})

// 格式化日期
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
