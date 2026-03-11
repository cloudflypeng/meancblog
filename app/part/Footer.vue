<script setup lang="ts">
import SocialLinks from '~/components/SocialLinks.vue'
const { siteConfig } = useRuntimeConfig().public
const currentYear = new Date().getFullYear()

const links = [
  { label: '首页', to: '/' },
  { label: '简历', to: '/resume' },
  { label: '文章', to: '/blog' },
  { label: '项目', to: '/project' },
  { label: '友链', to: '/friends' }
]
</script>

<template>
  <footer class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <!-- Brand -->
        <div class="flex items-center gap-5">
          <NuxtLink to="/" class="group flex items-center gap-2 shrink-0">
            <img :src="siteConfig.site.logo" :alt="siteConfig.site.author"
              class="w-7 h-7 rounded-md object-cover" />
            <span class="font-medium text-sm text-gray-900 dark:text-white">
              {{ siteConfig.site.author }}
            </span>
          </NuxtLink>
          <nav class="hidden sm:flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span class="text-gray-300 dark:text-gray-700">|</span>
            <NuxtLink v-for="link in links" :key="link.to" :to="link.to"
              class="hover:text-primary transition-colors">
              {{ link.label }}
            </NuxtLink>
            <a href="/rss.xml" target="_blank" class="hover:text-primary transition-colors">
              RSS
            </a>
          </nav>
        </div>

        <!-- Right side -->
        <div class="flex items-center gap-4">
          <SocialLinks />
          <span class="text-xs text-gray-400 dark:text-gray-500">
            &copy; {{ currentYear }} {{ siteConfig.site.author }}
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
