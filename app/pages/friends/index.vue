<template>
  <div>
    <!-- Hero 部分 -->
    <section class="py-16 text-center bg-gray-50">
      <div class="max-w-3xl mx-auto px-4">
        <h1 class="text-5xl font-bold mb-4">朋友们</h1>
        <p class="text-xl text-gray-600 mb-6">这里是我的朋友们和合作者</p>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          如果你也想和我交换友链，欢迎通过以下方式联系我。我们一起分享知识，共同进步。
        </p>
      </div>
    </section>

    <!-- 朋友列表 -->
    <section class="py-16 relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard v-for="friend in friends" :key="friend.name" as="a" :href="friend.url" target="_blank"
            rel="noopener noreferrer" class="group hover:shadow-lg transition-shadow">
            <!-- 头像 -->
            <template #header>
              <div class="overflow-hidden rounded-t-lg bg-gray-100 h-48">
                <img :src="friend.avatar" :alt="friend.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
            </template>

            <!-- 信息 -->
            <div class="space-y-2">
              <h3 class="text-xl font-bold group-hover:text-blue-600 transition-colors">
                {{ friend.name }}
              </h3>
              <p v-if="friend.desc" class="text-gray-600 text-sm line-clamp-2">
                {{ friend.desc }}
              </p>
              <p v-else class="text-gray-400 text-sm">
                一位神秘的合作者
              </p>
            </div>
          </UCard>
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
