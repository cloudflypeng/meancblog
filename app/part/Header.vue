<script setup lang="ts">
const links = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: 'Blog',
    icon: 'i-heroicons-document-text',
    to: '/blog'
  },
  {
    label: 'Friends',
    icon: 'i-heroicons-users',
    to: '/friends'
  }
]

const { siteConfig } = useRuntimeConfig().public

// 滚动隐藏逻辑
const isHeaderVisible = ref(true)
const lastScrollY = ref(0)
const scrollThreshold = 100 // 滚动阈值（像素）

const handleScroll = () => {
  const currentScrollY = window.scrollY

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
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="fixed w-full z-100 transition-transform duration-300 ease-in-out"
    :class="{ '-translate-y-full': !isHeaderVisible }">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and title -->
        <div class="flex items-center gap-2">
          <img :src="siteConfig.site.logo" :alt="siteConfig.site.author" class="w-10 h-10 rounded-md" />
          <span class="font-bold text-lg text-primary">{{ siteConfig.site.author }}</span>
        </div>

        <!-- Navigation links -->
        <nav class="flex items-center gap-6">
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to"
            class="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
            <UIcon :name="link.icon" />
            <span>{{ link.label }}</span>
          </NuxtLink>
          <ThemeToggle />
        </nav>
      </div>
    </div>
  </header>
</template>
