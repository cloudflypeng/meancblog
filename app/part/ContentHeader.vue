<template>
  <div class="w-full mb-8 flex items-center justify-between">
    <div>
      <h1 class="text-4xl font-bold mb-2">{{ title }}</h1>
      <p class="opacity-50">{{ description }}</p>
    </div>
    <div class="shrink-0">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const { title, description } = defineProps<{
  title: string
  description?: string
}>()
</script>
