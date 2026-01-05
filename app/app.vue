<template>
  <div>
    <!-- 导航栏 -->
    <nav class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <NuxtLink to="/" class="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            MeanC Blog
          </NuxtLink>
          <div class="flex items-center space-x-8">
            <NuxtLink to="/" class="text-gray-700 hover:text-blue-600 transition-colors">
              首页
            </NuxtLink>
            <NuxtLink to="/blog" class="text-gray-700 hover:text-blue-600 transition-colors">
              博客
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主内容区 -->
    <NuxtPage />
  </div>
</template>
<script lang="ts">
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
