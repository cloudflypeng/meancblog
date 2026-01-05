<script setup lang="ts">
const colorMode = useColorMode()

const toggleTheme = async (event: MouseEvent) => {
  // 检查浏览器是否支持 View Transitions API
  if (!document.startViewTransition) {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
    return
  }

  // 获取点击位置
  const x = event.clientX
  const y = event.clientY

  // 计算从点击点到页面最远角的距离
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )

  // 使用 View Transitions API
  const transition = document.startViewTransition(() => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
  })

  // 等待过渡准备就绪
  await transition.ready

  // 创建圆形扩散动画
  document.documentElement.animate(
    {
      clipPath: [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ]
    },
    {
      duration: 600,
      easing: 'ease-in-out',
      pseudoElement: '::view-transition-new(root)'
    }
  )
}

const isDark = computed(() => colorMode.value === 'dark')
</script>

<template>
  <button @click="toggleTheme" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    class="p-2 rounded-lg hover:opacity-80 transition-opacity">
    <UIcon :name="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" class="w-5 h-5 text-primary" />
  </button>
</template>

<style>
/* 启用 View Transitions */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 999;
}
</style>
