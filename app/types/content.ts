// Nuxt Content 类型定义
export interface BlogArticle {
  path: string
  title: string
  description: string
  date: string
  author: string
  tags?: string[]
  cover?: string
  body?: any
  [key: string]: any
}
