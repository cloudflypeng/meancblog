<template>
  <div>
    <!-- Hero 部分 -->
    <ULandingHero title="博客文章" description="分享技术见解与开发经验" />

    <!-- 博客列表 -->
    <section class="py-16 relative z-10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="articles && articles.length > 0" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink v-for="article in articles" :key="article.path" :to="article.path" class="group">
            <UCard class="h-full hover:shadow-lg transition-shadow">
              <!-- 封面图 -->
              <template #header>
                <div
                  class="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden rounded-t-lg">
                  <img v-if="article.cover" :src="article.cover" :alt="article.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div v-else class="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                    {{ article.title.charAt(0) }}
                  </div>
                </div>
              </template>

              <!-- 文章信息 -->
              <div class="p-6 space-y-4">
                <h2 class="text-2xl font-bold line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {{ article.title }}
                </h2>

                <p class="text-gray-600 line-clamp-3">
                  {{ article.description }}
                </p>

                <!-- 标签 -->
                <div v-if="article.tags" class="flex flex-wrap gap-2">
                  <UBadge v-for="tag in article.tags" :key="tag" color="primary" variant="subtle">
                    {{ tag }}
                  </UBadge>
                </div>

                <!-- 元信息 -->
                <div class="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                  <span>{{ article.author }}</span>
                  <time>{{ formatDate(article.date) }}</time>
                </div>
              </div>
            </UCard>
          </NuxtLink>
        </div>

        <!-- 空状态 -->
        <div v-else class="text-center py-12">
          <p class="text-gray-500 text-lg">暂无文章</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <PartFooter />
  </div>
</template>

<script setup lang="ts">
import type { BlogArticle } from '~/types/content'
import PartFooter from '~/part/Footer.vue'

const { data: articles } = await useAsyncData('blog-list', () =>
  (queryCollection as any)('blog')
    .order('date', 'DESC')
    .all() as Promise<BlogArticle[]>
)

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
