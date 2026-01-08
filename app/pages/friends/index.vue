<template>
  <div class="min-h-screen pt-20">
    <!-- 头部 -->
    <div class="max-w-4xl mx-auto px-6 mb-12">
      <h1 class="text-4xl font-bold mb-4">朋友们</h1>
      <p class="text-gray-500 dark:text-gray-400">一些很酷的朋友们。如果你也想交换友链，欢迎联系我。</p>
    </div>

    <!-- 朋友列表 -->
    <div class="max-w-4xl mx-auto px-6 pb-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a v-for="friend in friends" :key="friend.name" :href="friend.url" target="_blank" rel="noopener noreferrer"
          class="flex items-start p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 group hover:bg-gray-50 dark:hover:bg-gray-800/50">

          <!-- 头像 -->
          <div class="shrink-0 mr-4">
            <img :src="friend.avatar" :alt="friend.name"
              class="w-14 h-14 rounded-full object-cover border border-gray-100 dark:border-gray-800 group-hover:scale-110 transition-transform duration-300" />
          </div>

          <!-- 信息 -->
          <div class="flex-1 min-w-0 py-1">
            <h3
              class="text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">
              {{ friend.name }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
              {{ friend.desc || '' }}
            </p>
          </div>
        </a>
      </div>
    </div>

    <!-- Footer -->
    <PartFooter />
  </div>
</template>

<script setup lang="ts">
import PartFooter from '~/part/Footer.vue'

interface Friend {
  name: string
  avatar: string
  url: string
  desc?: string
}

const config = useRuntimeConfig()
const friends = config.public.friendsData as Friend[]

useHead({
  title: 'Friends - MeanC Blog',
  meta: [
    {
      name: 'description',
      content: '我的朋友们，以及优秀的友链展示'
    }
  ]
})
</script>
