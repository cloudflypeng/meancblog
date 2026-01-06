<template>
  <UApp>
    <PartBg />
    <!-- 页面加载进度条 -->
    <PageProgress />

    <!-- 导航栏 -->
    <PartHeader />

    <!-- 主内容区 -->
    <NuxtPage />
  </UApp>
</template>
<script lang="ts">
import PartHeader from '~/part/Header.vue'
import PartBg from '~/part/Bg.vue'

export default {
  components: {
    PartHeader,
    PartBg
  }
}
</script>
<style>
html {
  scrollbar-gutter: stable;
}

body {
  padding: 0;
  margin: 0;
}

.outline-text {
  color: white;
  /* 字体颜色 */
  -webkit-text-stroke: 2px black;
  /* 描边粗细和颜色 */
}
</style>
