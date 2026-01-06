<script setup lang="ts">
const { siteConfig } = useRuntimeConfig().public
const currentYear = new Date().getFullYear()

const links = [
  { label: '首页', to: '/' },
  { label: '技术', to: '/blog' },
  { label: '项目', to: '/project' },
  { label: '友链', to: '/friends' }
]

const socialLinks = computed(() => {
  return Object.entries(siteConfig.social).map(([key, config]: [string, any]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    url: config.url,
    icon: config.icon
  }))
})
</script>

<template>
  <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

        <!-- Column 1: Brand & Desc -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <img :src="siteConfig.site.logo" :alt="siteConfig.site.author" class="w-8 h-8 rounded-md" />
            <span class="font-bold text-xl text-primary">{{ siteConfig.site.author }}</span>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
            {{ siteConfig.site.description }}
          </p>
        </div>

        <!-- Column 2: Navigation -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">导航</h3>
          <ul class="space-y-2">
            <li v-for="link in links" :key="link.to">
              <NuxtLink :to="link.to"
                class="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Column 3: Social -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">关注我</h3>
          <div class="flex flex-wrap gap-2">
            <UButton v-for="social in socialLinks" :key="social.name" :icon="social.icon" :to="social.url"
              target="_blank" variant="ghost" size="lg" class="hover:text-primary dark:hover:text-primary" />
          </div>
          <p class="mt-4 text-xs text-gray-400 dark:text-gray-500">
            随时欢迎通过社交平台与我联系！
          </p>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-gray-400">
          &copy; {{ currentYear }} {{ siteConfig.site.author }}. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
