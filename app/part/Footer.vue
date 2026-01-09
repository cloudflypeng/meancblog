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

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

        <!-- Brand Section -->
        <div class="lg:col-span-5 space-y-6">
          <NuxtLink to="/" class="group flex items-center gap-3 w-fit">
            <div class="relative">
              <div
                class="absolute -inset-1 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm">
              </div>
              <img :src="siteConfig.site.logo" :alt="siteConfig.site.author"
                class="relative w-10 h-10 rounded-lg shadow-sm object-cover" />
            </div>
            <span class="font-bold text-xl tracking-tight text-gray-900 dark:text-white">{{ siteConfig.site.author
              }}</span>
          </NuxtLink>

          <p class="text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
            {{ siteConfig.site.description }}
          </p>

          <div class="pt-2">
            <SocialLinks />
          </div>
        </div>

        <!-- Navigation Section -->
        <div class="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:pl-12">
          <!-- Column 1 -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">探索</h3>
            <ul class="space-y-3">
              <li v-for="link in links.slice(0, 2)" :key="link.to">
                <NuxtLink :to="link.to"
                  class="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors block">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Column 2 -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">更多</h3>
            <ul class="space-y-3">
              <li v-for="link in links.slice(2)" :key="link.to">
                <NuxtLink :to="link.to"
                  class="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors block">
                  {{ link.label }}
                </NuxtLink>
              </li>
              <!-- Example static link if wanted -->
              <li>
                <a href="/rss.xml" target="_blank"
                  class="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors block">
                  RSS 订阅
                </a>
              </li>
            </ul>
          </div>

          <!-- Column 3 (Quote or Decoration) -->
          <div class="space-y-4 sm:block hidden">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">关于</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              热爱技术，持续学习。<br />
              分享编程心得与生活感悟。
            </p>
          </div>

        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-gray-400 dark:text-gray-500">
          &copy; {{ currentYear }} {{ siteConfig.site.author }}. All rights reserved.
        </p>

        <div class="flex items-center gap-6 text-sm text-gray-400 dark:text-gray-500">
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
