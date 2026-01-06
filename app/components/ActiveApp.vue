<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const config = useRuntimeConfig()
const { data: syncData, refresh } = useFetch('/proxy/sync', {
  server: false,
  headers: {
    Authorization: `Bearer ${config.public.syncToken}`
  }
})

const syncDataTyped = computed(() => {
  return syncData.value ? (syncData.value as any).app + ' on ' + (syncData?.value as any).device : ''
})

// 轮询刷新，每 5 秒更新一次状态
let interval: any = null
onMounted(() => {
  interval = setInterval(() => {
    refresh()
  }, 5000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>
<template>
  <div class="text-xs font-mono text-gray-500">{{ syncDataTyped }}</div>
</template>
