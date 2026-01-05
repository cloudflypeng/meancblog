<script setup lang="ts">
defineProps<{
  width?: string | number
  height?: string | number
}>()
</script>

<template>
  <div
    :style="{ width: typeof width === 'number' ? width + 'px' : width, height: typeof height === 'number' ? height + 'px' : height }"
    :class="['relative flex justify-center items-center', !width && !height ? 'w-full h-full' : '']">
    <slot />
    <!-- Top Left -->
    <svg class="absolute top-0 left-0" width="40" height="40" viewBox="0 0 40 40" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M2 12 V2 H12" stroke="currentColor" stroke-width="2" />
      <rect x="6" y="6" width="2" height="2" fill="currentColor" />
    </svg>
    <!-- Top Right -->
    <svg class="absolute top-0 right-0" width="40" height="40" viewBox="0 0 40 40" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M38 12 V2 H28" stroke="currentColor" stroke-width="2" />
      <rect x="32" y="6" width="2" height="2" fill="currentColor" />
    </svg>
    <!-- Bottom Left -->
    <svg class="absolute bottom-0 left-0" width="40" height="40" viewBox="0 0 40 40" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M2 28 V38 H12" stroke="currentColor" stroke-width="2" />
      <rect x="6" y="32" width="2" height="2" fill="currentColor" />
    </svg>
    <!-- Bottom Right -->
    <svg class="absolute bottom-0 right-0" width="40" height="40" viewBox="0 0 40 40" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M38 28 V38 H28" stroke="currentColor" stroke-width="2" />
      <rect x="32" y="32" width="2" height="2" fill="currentColor" />
    </svg>
  </div>
</template>
