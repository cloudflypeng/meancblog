import { defineEventHandler, proxyRequest } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = config.public?.syncToken || process.env.NUXT_SYNC_TOKEN || ''

  // 使用 proxyRequest 直接透传所有流量，不做中间解析
  // 这在处理 SSE/WebSocket 等长连接时通常是最稳的
  return proxyRequest(event, 'https://sync.meanc.cc/api/active_app/stream', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'text/event-stream'
    },
    // 关键配置：让 node-fetch 在底层使用 stream 模式
    // @ts-ignore
    duplex: 'half',

    // 响应钩子：确保 Headers 不被 Nitro 默认值覆盖
    onResponse(outputEvent, response) {
      if (response.headers.get('content-type') === 'text/event-stream') {
        outputEvent.node.res.setHeader('Content-Type', 'text/event-stream')
        outputEvent.node.res.setHeader('Cache-Control', 'no-cache')
        outputEvent.node.res.setHeader('Connection', 'keep-alive')
        outputEvent.node.res.setHeader('X-Accel-Buffering', 'no')
      }
    }
  })
})
