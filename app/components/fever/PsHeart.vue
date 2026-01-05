<script setup lang="ts">
defineProps<{
  width?: string | number
  height?: string | number
}>()
</script>

<template>
  <svg :width="width" :height="height" :class="[!width && !height ? 'w-full h-full' : '']" viewBox="0 0 24 24"
    fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.5L3 12.5V6L7 2L12 7L17 2L21 6V12.5L12 21.5Z" stroke="currentColor" stroke-width="2" fill="none" />
    <rect x="11" y="10" width="2" height="2" fill="currentColor" />
  </svg>
</template>
