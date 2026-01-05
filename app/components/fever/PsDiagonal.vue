<script setup lang="ts">
defineProps<{
  width?: string | number
  height?: string | number
}>()
</script>

<template>
  <svg :width="width" :height="height" :class="[!width && !height ? 'w-full h-full' : '']" viewBox="0 0 40 40"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="40" x2="40" y2="10" stroke="currentColor" stroke-width="4" />
    <line x1="0" y1="40" x2="40" y2="0" stroke="currentColor" stroke-width="4" />
    <line x1="0" y1="30" x2="30" y2="0" stroke="currentColor" stroke-width="4" />
  </svg>
</template>
