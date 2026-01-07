<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const config = useRuntimeConfig()
const token = config.public.syncToken

// 当前前台 app 文本
const syncText = ref('')

// WebSocket 实例
let ws: WebSocket | null = null
let reconnectTimer: number | null = null

function connectWS() {
  try {
    // 通过 Nuxt 服务器代理连接 WebSocket
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const url = `${protocol}//${window.location.host}/ws`
    ws = new WebSocket(url)

    ws.onopen = () => {
      console.log('✅ WS connected')
    }

    ws.onmessage = (e) => {
      try {
        const payload = JSON.parse(e.data)
        syncText.value = payload.app + ' on ' + (payload.device ?? 'unknown')
      } catch {
        syncText.value = e.data
      }
    }

    ws.onerror = (e) => {
      console.log('⚠️ WS error', e)
      cleanupWS()
      scheduleReconnect()
    }

    ws.onclose = () => {
      console.log('⚠️ WS closed')
      cleanupWS()
      scheduleReconnect()
    }
  } catch (e) {
    console.log('WS connection failed:', e)
    scheduleReconnect()
  }
}

function cleanupWS() {
  if (ws) {
    ws.close()
    ws = null
  }
}

function scheduleReconnect() {
  if (reconnectTimer) clearTimeout(reconnectTimer)
  reconnectTimer = window.setTimeout(() => {
    connectWS()
  }, 3000)
}

onMounted(() => {
  if (typeof WebSocket !== 'undefined') {
    connectWS()
  }
})

onUnmounted(() => {
  cleanupWS()
  if (reconnectTimer) {
    clearTimeout(reconnectTimer)
    reconnectTimer = null
  }
})
</script>

<template>
  <div class="text-xs font-mono text-gray-500">{{ syncText }}</div>
</template>
