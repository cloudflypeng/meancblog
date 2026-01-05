<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">博客文章</h1>
        <p class="text-lg text-gray-600">分享技术见解与开发经验</p>
      </div>

      <!-- 博客列表 -->
      <div v-if="articles && articles.length > 0" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article v-for="article in articles" :key="article.path"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <NuxtLink :to="article.path" class="block">
            <!-- 封面图 -->
            <div class="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
              <img v-if="article.cover" :src="article.cover" :alt="article.title" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                {{ article.title.charAt(0) }}
              </div>
            </div>

            <!-- 文章信息 -->
            <div class="p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                {{ article.title }}
              </h2>

              <p class="text-gray-600 mb-4 line-clamp-3">
                {{ article.description }}
              </p>

              <!-- 标签 -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="tag in article.tags" :key="tag"
                  class="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                  {{ tag }}
                </span>
              </div>

              <!-- 元信息 -->
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>{{ article.author }}</span>
                <time>{{ formatDate(article.date) }}</time>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-12">
        <p class="text-gray-500 text-lg">暂无文章</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogArticle } from '~/types/content'

// 查询所有博客文章
const { data: articles } = await useAsyncData('blog-list', () =>
  (queryCollection as any)('blog')
    .order('date', 'DESC') // 按日期降序排序
    .all() as Promise<BlogArticle[]>
)

// 格式化日期
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// SEO 元数据
useHead({
  title: '博客文章 - MeanC Blog',
  meta: [
    {
      name: 'description',
      content: '浏览我的技术博客文章，了解最新的开发技巧和经验分享'
    }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
