// 扩展 Nuxt Content 类型
declare module '#app' {
  interface NuxtApp {
    $content: any
  }
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    content?: {
      highlight?: {
        theme?: string
        preload?: string[]
      }
      markdown?: {
        toc?: {
          depth?: number
          searchDepth?: number
        }
      }
    }
  }
}

export { }
