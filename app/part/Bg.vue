<template>
  <!-- 对角线网格背景 -->
  <div class="fixed w-screen h-screen -z-10 pointer-events-none" :class="isDark ? 'opacity-20' : 'opacity-50'" :style="{
    backgroundImage: `
          repeating-linear-gradient(45deg, ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} 0, ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} 1px, transparent 1px, transparent 20px),
          repeating-linear-gradient(-45deg, ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} 0, ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} 1px, transparent 1px, transparent 20px)
        `,
    backgroundSize: '40px 40px',
  }">
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
</script>

<style scoped></style>
