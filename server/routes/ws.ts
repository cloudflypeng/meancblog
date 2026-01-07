import { defineEventHandler } from 'h3'
import { WebSocketServer } from 'ws'
import type WebSocket from 'ws'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = config.public?.syncToken || process.env.NUXT_SYNC_TOKEN || ''

  // 检查是否是 WebSocket 升级请求
  const req = event.node?.req
  const res = event.node?.res

  if (req && req.headers.upgrade?.toLowerCase() === 'websocket') {
    // 阻止 h3 处理响应
    if (res) res.statusCode = 101

    // 获取底层的 socket 和 head
    const socket = (req as any).socket
    const head = Buffer.alloc(0)

    // 创建客户端 WebSocket 服务器
    const wss = new WebSocketServer({ noServer: true })

    wss.handleUpgrade(req as any, socket, head, (clientWs: WebSocket) => {
      console.log('✅ Client WebSocket connected')

      // 创建到后端的 WebSocket 连接
      const backendWs = new (require('ws'))('wss://sync.meanc.cc/api/active_app/stream', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      backendWs.on('open', () => {
        console.log('✅ Backend WebSocket connected')
      })

      // 后端消息 -> 客户端
      backendWs.on('message', (data: any) => {
        if (clientWs.readyState === 1) {
          clientWs.send(data)
        }
      })

      // 客户端消息 -> 后端
      clientWs.on('message', (data: any) => {
        if (backendWs.readyState === 1) {
          backendWs.send(data)
        }
      })

      // 后端关闭 -> 关闭客户端
      backendWs.on('close', () => {
        console.log('⚠️ Backend WebSocket closed')
        clientWs.close()
      })

      // 客户端关闭 -> 关闭后端
      clientWs.on('close', () => {
        console.log('⚠️ Client WebSocket closed')
        backendWs.close()
      })

      // 错误处理
      backendWs.on('error', (err: Error) => {
        console.error('❌ Backend WS error:', err.message)
        clientWs.close()
      })

      clientWs.on('error', (err: Error) => {
        console.error('❌ Client WS error:', err.message)
        backendWs.close()
      })
    })

    // 返回空以防止 h3 继续处理
    return
  }

  return { error: 'WebSocket upgrade required' }
})
