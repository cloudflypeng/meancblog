<template>
  <UApp>
    <OverlayScrollbarsComponent id="scroll-wrapper" defer class="h-screen w-full"
      :options="{ scrollbars: { autoHide: 'move', clickScroll: true } }">
      <PartBg />
      <!-- 页面加载进度条 -->
      <PageProgress />

      <!-- 导航栏 -->
      <PartHeader />

      <!-- 主内容区 -->
      <NuxtPage />
      <Footer />
    </OverlayScrollbarsComponent>
  </UApp>
</template>
<script setup lang="ts">
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import PartHeader from '~/part/Header.vue'
import PartBg from '~/part/Bg.vue'
import Footer from '~/part/Footer.vue'
</script>
<style>
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.outline-text {
  color: white;
  /* 字体颜色 */
  -webkit-text-stroke: 2px black;
  /* 描边粗细和颜色 */
}
</style>
