<script setup lang="ts">
const { siteConfig } = useRuntimeConfig().public
const currentYear = new Date().getFullYear()
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-sm">
        © {{ currentYear }} {{ siteConfig.site.author }}. All rights reserved.
      </p>
    </template>

    <template #right>
      <div class="flex gap-4">
        <UButton v-if="siteConfig.social.github" :to="siteConfig.social.github" target="_blank"
          rel="noopener noreferrer" color="primary" variant="ghost" icon="i-heroicons-link">
          GitHub
        </UButton>
        <UButton v-if="siteConfig.social.twitter" :to="siteConfig.social.twitter" target="_blank"
          rel="noopener noreferrer" color="primary" variant="ghost" icon="i-heroicons-link">
          Twitter
        </UButton>
      </div>
    </template>
  </UFooter>
</template>
