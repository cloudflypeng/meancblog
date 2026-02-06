<script setup lang="ts">
import SocialLinks from '~/components/SocialLinks.vue'; // Explicit import to be safe, though auto-import likely works
const { siteConfig } = useRuntimeConfig().public
const currentYear = new Date().getFullYear()

const links = [
  { label: '首页', to: '/' },
  { label: '文章', to: '/blog' },
  { label: '项目', to: '/project' },
  { label: '友链', to: '/friends' }
]
</script>

<template>
  <footer class="relative bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
    <!-- 背景装饰 -->
    <div
      class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent opacity-50">
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <!-- Brand + Social -->
        <div class="flex flex-col gap-3">
          <NuxtLink to="/" class="group flex items-center gap-3 w-fit">
            <div class="relative">
              <div
                class="absolute -inset-1 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm">
              </div>
              <img :src="siteConfig.site.logo" :alt="siteConfig.site.author"
                class="relative w-9 h-9 rounded-md shadow-sm object-cover" />
            </div>
            <span class="font-semibold text-lg tracking-tight text-gray-900 dark:text-white">
              {{ siteConfig.site.author }}
            </span>
          </NuxtLink>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
            {{ siteConfig.site.description }}
          </p>
          <div class="pt-1">
            <SocialLinks />
          </div>
        </div>

        <!-- Compact Nav -->
        <nav class="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to"
            class="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
            {{ link.label }}
          </NuxtLink>
          <a href="/rss.xml" target="_blank"
            class="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
            RSS 订阅
          </a>
        </nav>
      </div>

      <!-- Bottom Bar -->
      <div
        class="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800/50 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p class="text-xs text-gray-400 dark:text-gray-500">
          &copy; {{ currentYear }} {{ siteConfig.site.author }}. All rights reserved.
        </p>
        <div class="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
          <span class="hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-default">
            Built with Nuxt 3
          </span>
          <span class="hidden sm:inline">|</span>
          <span class="hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-default">
            Deployed on Vercel
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
