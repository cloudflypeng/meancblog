<template>
  <!-- 对角线网格背景 -->
  <div class="fixed w-screen h-screen -z-1 pointer-events-none opacity-50" :style="{
    backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
          repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
    backgroundSize: '40px 40px',
  }">
  </div>
</template>

<style scoped>
.dark .absolute {
  opacity: 0.3;
}
</style>
