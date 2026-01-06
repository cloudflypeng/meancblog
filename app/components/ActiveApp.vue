<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const config = useRuntimeConfig()
const token = config.public.syncToken

// 保留 useFetch 用于首屏获取初始值
const { data: syncData, refresh } = useFetch('/proxy/sync', {
  server: false,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

const syncText = ref('')

watch(syncData, (v) => {
  if (v) {
    const anyv = v as any
    syncText.value = anyv.app + ' on ' + anyv.device
  }
})


let es: EventSource | null = null
let reconnectTimer: number | null = null

function connect() {
  try {
    const url = `/api/active_app/stream`
    es = new EventSource(url)
    es.onmessage = (e) => {
      try {
        const payload = JSON.parse(e.data)
        syncText.value = payload.app + ' on ' + payload.device
      } catch {
        syncText.value = e.data
      }
    }
    es.onerror = (e) => {
      console.log('SSE connection error:', es?.readyState)
      if (es) {
        try { es.close() } catch {}
        es = null
      }
      if (reconnectTimer) clearTimeout(reconnectTimer)
      reconnectTimer = window.setTimeout(() => {
        connect()
      }, 3000)
    }
  } catch {
    if (reconnectTimer) clearTimeout(reconnectTimer)
    reconnectTimer = window.setTimeout(() => {
      // connect()
    }, 3000)
  }
}

onMounted(() => {
  if (typeof EventSource !== 'undefined') {
    connect()
  }
})

onUnmounted(() => {
  if (es) {
    es.close()
    es = null
  }
  if (reconnectTimer) {
    clearTimeout(reconnectTimer)
    reconnectTimer = null
  }
})
</script>
<template>
  <div class="text-xs font-mono text-gray-500">{{ syncText }}</div>
</template>
