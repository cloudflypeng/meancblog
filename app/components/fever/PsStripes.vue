<script setup lang="ts">
defineProps<{
  width?: string | number
  height?: string | number
}>()
</script>

<template>
  <svg :width="width" :height="height" :class="[!width && !height ? 'w-full h-full' : '']" viewBox="0 0 100 20"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="2" width="50" height="16" fill="currentColor" />
    <rect x="55" y="6" width="25" height="8" fill="currentColor" />
    <rect x="85" y="8" width="15" height="4" fill="currentColor" />
  </svg>
</template>
