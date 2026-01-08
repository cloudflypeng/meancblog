<template>
  <div class="min-h-screen pt-20">
    <!-- 头部 -->
    <div class="max-w-4xl mx-auto px-6 mb-16">
      <h1 class="text-4xl font-bold mb-4">文章</h1>
      <p class="text-gray-500 dark:text-gray-400 mb-8">分享技术见解与开发经验</p>

      <!-- 标签筛选 -->
      <div v-if="tags.length > 0" class="flex flex-wrap gap-2">
        <button @click="selectedTag = null" class="px-3 py-1 text-sm rounded-full transition-colors duration-200"
          :class="!selectedTag
            ? 'bg-black text-white dark:bg-white dark:text-black font-medium'
            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'">
          全部
        </button>
        <button v-for="tag in tags" :key="tag" @click="toggleTag(tag)"
          class="px-3 py-1 text-sm rounded-full transition-colors duration-200"
          :class="selectedTag === tag
            ? 'bg-black text-white dark:bg-white dark:text-black font-medium'
            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'">
          #{{ tag }}
        </button>
      </div>
    </div>

    <!-- 博客列表 -->
    <div class="max-w-4xl mx-auto px-6">
      <div v-if="filteredArticles && filteredArticles.length > 0"
        class="relative border-l border-gray-200 dark:border-gray-800 ml-3 space-y-12 pb-12">
        <div v-for="article in filteredArticles" :key="article.path" class="relative pl-8 sm:pl-12 group">
          <!-- 时间轴点 -->
          <div
            class="absolute left-0 top-2 -translate-x-[calc(50%+0.5px)] w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 bg-gray-300 dark:bg-gray-600 group-hover:bg-primary group-hover:scale-125 transition-all duration-300 z-10">
          </div>

          <NuxtLink :to="article.path" class="block group">
            <!-- 标题和时间 -->
            <div class="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-3">
              <h2 class="text-2xl font-bold group-hover:text-primary transition-colors">
                {{ article.title }}
              </h2>
              <time class="text-sm font-mono text-gray-500 whitespace-nowrap">
                {{ formatDate(article.date) }}
              </time>
            </div>

            <!-- 描述 -->
            <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2">
              {{ article.description }}
            </p>

            <!-- 标签 -->
            <div v-if="article.tags" class="flex flex-wrap gap-2">
              <span v-for="tag in article.tags" :key="tag"
                class="px-2.5 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">

                #{{ tag }}
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-24">
        <p class="text-gray-500 text-lg">暂无文章</p>
      </div>
    </div>

    <!-- Footer -->
    <PartFooter />
  </div>
</template>

<script setup lang="ts">

import type { BlogArticle } from '~/types/content'
import PartFooter from '~/part/Footer.vue'

const { data: articles } = await useAsyncData('blog-list', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

// 标签筛选
const selectedTag = ref<string | null>(null)

const tags = computed(() => {
  if (!articles.value) return []
  const allTags = new Set<string>()
  articles.value.forEach(article => {
    if (article.tags) {
      article.tags.forEach(tag => allTags.add(tag))
    }
  })
  return Array.from(allTags).sort()
})

const toggleTag = (tag: string) => {
  if (selectedTag.value === tag) {
    selectedTag.value = null
  } else {
    selectedTag.value = tag
  }
}

const filteredArticles = computed(() => {
  if (!articles.value) return []
  if (!selectedTag.value) return articles.value
  return articles.value.filter(article => article.tags?.includes(selectedTag.value!))
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

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
