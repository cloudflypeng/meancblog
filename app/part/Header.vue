<script setup lang="ts" vapor>
import { ref } from 'vue'

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
</script>

<template>
  <UHeader>
    <template #left>
      <div class="flex items-center gap-2">
        <img :src="siteConfig.site.logo" :alt="siteConfig.site.author" class="w-10 h-10 rounded-full" />
        <span class="font-bold text-lg">{{ siteConfig.site.author }}</span>
      </div>
    </template>

    <template #right>
      <UHorizontalNav :links="links" />
    </template>
  </UHeader>
</template>
