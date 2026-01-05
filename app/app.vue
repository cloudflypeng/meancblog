<template>
  <div>
    <!-- 导航栏 -->
    <PartHeader />

    <!-- 主内容区 -->
    <NuxtPage />
  </div>
</template>
<script lang="ts">
import PartHeader from '~/part/Header.vue'

export default {
  components: {
    PartHeader
  }
}
</script>
<style>
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
