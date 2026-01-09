<script setup lang="ts">
import { ref } from 'vue'
// import ActiveApp from '~/components/ActiveApp.vue'

const config = useRuntimeConfig()
const siteConfig = config.public.siteConfig
const route = useRoute()

const links = [
  {
    label: '首页',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: '文章',
    icon: 'i-heroicons-document-text',
    to: '/blog'
  },
  {
    label: '项目',
    icon: 'i-heroicons-bolt',
    to: '/project'
  },
  {
    label: '相册',
    icon: 'i-heroicons-photo',
    to: '/gallery'
  },
  {
    label: '友链',
    icon: 'i-heroicons-user-group',
    to: '/friends'
  }
]

// 移动端菜单状态
const isMenuOpen = ref(false)

// 路由变化时关闭菜单
watch(() => route.fullPath, () => {
  isMenuOpen.value = false
})

// 滚动隐藏逻辑
const isHeaderVisible = ref(true)
const lastScrollY = ref(0)
const scrollThreshold = 100 // 滚动阈值（像素）

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement
  const currentScrollY = target.scrollTop

  // 如果滚动距离小于阈值，始终显示
  if (currentScrollY < scrollThreshold) {
    isHeaderVisible.value = true
    lastScrollY.value = currentScrollY
    return
  }

  // 向下滚动时隐藏，向上滚动时显示
  if (currentScrollY > lastScrollY.value) {
    isHeaderVisible.value = false
  } else {
    isHeaderVisible.value = true
  }

  lastScrollY.value = currentScrollY
}

onMounted(() => {
  const scrollWrapper = document.getElementById('scroll-wrapper')
  scrollWrapper?.addEventListener('scroll', handleScroll, { passive: true, capture: true })
})

onUnmounted(() => {
  const scrollWrapper = document.getElementById('scroll-wrapper')
  scrollWrapper?.removeEventListener('scroll', handleScroll, { capture: true } as EventListenerOptions)
})

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="fixed top-0 w-full z-40 transition-transform duration-300 ease-in-out"
    :class="{ '-translate-y-full': !isHeaderVisible }">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">

        <!-- Mobile Menu Button (Left) -->
        <div class="flex lg:hidden">
          <UButton icon="i-heroicons-bars-3" variant="ghost" @click="isMenuOpen = true" aria-label="Open menu" />
        </div>

        <!-- Logo -->
        <div class="flex-1 flex items-center gap-2 justify-center lg:flex-none lg:justify-start">
          <!-- <ActiveApp /> -->
          <NuxtLink to="/" class="flex items-center gap-2">
            <!-- <img :src="siteConfig.site.logo" :alt="siteConfig.site.author" class="w-8 h-8 rounded-md" /> -->
            <span class="font-bold text-lg hidden sm:block">{{ siteConfig.site.author }}</span>
          </NuxtLink>

        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-6">
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to"
            class="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
            <UIcon :name="link.icon" class="w-5 h-5" />
            <span>{{ link.label }}</span>
          </NuxtLink>
          <ThemeToggle />
        </nav>

        <!-- Right Side Utils (Mobile) -->
        <div class="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Menu Overlay (Manual Implementation) -->
  <Teleport to="body">
    <div v-if="isMenuOpen" class="fixed inset-0 z-50 lg:hidden flex">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" @click="closeMenu"></div>

      <!-- Drawer -->
      <div
        class="relative w-4/5 max-w-xs bg-white dark:bg-gray-900 h-full shadow-2xl p-6 flex flex-col gap-6 transform transition-transform duration-300 ease-in-out slide-in-from-left">

        <!-- Drawer Header -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <img :src="siteConfig.site.logo" class="w-8 h-8 rounded-md" />
            <span class="font-bold text-lg text-primary">{{ siteConfig.site.author }}</span>
          </div>
          <UButton icon="i-heroicons-x-mark" variant="ghost" @click="closeMenu" />
        </div>

        <!-- Drawer Links -->
        <nav class="flex flex-col space-y-2">
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to" @click="closeMenu"
            class="flex items-center gap-3 px-4 py-3 text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            active-class="bg-gray-50 dark:bg-gray-800 text-primary font-medium">
            <UIcon :name="link.icon" class="w-5 h-5" />
            <span>{{ link.label }}</span>
          </NuxtLink>
        </nav>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

.slide-in-from-left {
  animation: slideIn 0.3s ease-out forwards;
}
</style>
