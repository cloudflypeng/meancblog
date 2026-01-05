<template>
  <div class="min-h-screen">
    <!-- Hero 部分 - 简洁左对齐 -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-6xl font-bold mb-6 tracking-tight">Friends</h1>
        <p class="text-xl text-secondary max-w-2xl leading-relaxed">
          一些很酷的朋友们。如果你也想交换友链，欢迎联系我。
        </p>
      </div>
    </section>

    <!-- 朋友列表 - 优化卡片设计 -->
    <section class="pb-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a v-for="friend in friends" :key="friend.name" :href="friend.url" target="_blank" rel="noopener noreferrer"
            class="group block border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-xl">

            <!-- 头像区域 -->
            <div
              class="relative h-48 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
              <img :src="friend.avatar" :alt="friend.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
            </div>

            <!-- 信息区域 -->
            <div class="p-6 space-y-2">
              <h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
                {{ friend.name }}
              </h3>
              <p v-if="friend.desc" class="text-secondary text-sm leading-relaxed line-clamp-2">
                {{ friend.desc }}
              </p>
              <p v-else class="text-tertiary text-sm italic">
                神秘访客
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>

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

const { friendsData } = useRuntimeConfig().public
const friends = ref<Friend[]>(friendsData as any)

useHead({
  title: '朋友们 - MeanC Blog',
  meta: [
    {
      name: 'description',
      content: '我的朋友们和合作者，欢迎交换友链'
    }
  ]
})
</script>
