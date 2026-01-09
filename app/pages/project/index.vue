<script setup lang="ts">
import Experience from '~/components/Experience.vue'

useHead({
  title: 'Projects - MeanC Blog',
  meta: [
    {
      name: 'description',
      content: 'MeanC 的项目经历与作品展示，包括前端开发、SaaS平台、Indie 开发项目等。'
    }
  ]
})
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900">
    <Experience />
  </div>
</template>
