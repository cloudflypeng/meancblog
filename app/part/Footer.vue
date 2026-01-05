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
  </UFooter>
</template>
