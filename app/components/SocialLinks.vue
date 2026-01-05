<script setup lang="ts">
const { siteConfig } = useRuntimeConfig().public

// 社交媒体链接数组
const socialLinks = computed(() => {
  return Object.entries(siteConfig.social).map(([key, config]: [string, any]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    url: config.url,
    icon: config.icon,
    bg: config.bg,
    hoverBg: config.hoverBg
  }))
})
</script>

<template>
  <div class="flex items-center gap-4">
    <a v-for="social in socialLinks" :key="social.name" :href="social.url" :title="social.name" target="_blank"
      rel="noopener noreferrer" :style="{ backgroundColor: social.bg }"
      @mouseenter="(e) => e.currentTarget.style.backgroundColor = social.hoverBg"
      @mouseleave="(e) => e.currentTarget.style.backgroundColor = social.bg"
      class="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 transform hover:scale-110">
      <UIcon :name="social.icon" />
    </a>
  </div>
</template>
