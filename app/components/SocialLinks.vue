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
  <div class="flex items-center gap-4 md:justify-start justify-center">
    <a v-for="social in socialLinks" :key="social.name" :href="social.url" :title="social.name" target="_blank"
      rel="noopener noreferrer" :style="{ '--bg': social.bg, '--hover-bg': social.hoverBg } as any"
      class="social-btn w-12 h-12 rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 transform hover:scale-110">
      <UIcon :name="social.icon" />
    </a>
  </div>
</template>

<style scoped>
.social-btn {
  background-color: var(--bg);
}

.social-btn:hover {
  background-color: var(--hover-bg);
}
</style>
