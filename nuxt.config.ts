// https://nuxt.com/docs/api/configuration/nuxt-config
import config from './config.json'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@nuxt/content'
  ],
  app: {
    head: {
      title: config.site.title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: config.site.description },
        { name: 'author', content: config.site.author },
        { property: 'og:title', content: config.site.title },
        { property: 'og:description', content: config.site.description },
        { property: 'og:image', content: config.seo.ogImage }
      ],
      link: [
        { rel: 'icon', href: config.site.favicon }
      ]
    }
  },
  runtimeConfig: {
    public: {
      siteConfig: config
    }
  },
  content: {
    // 配置 Markdown 文件的处理
    // highlight: {
    //   theme: 'github-dark',
    //   preload: ['javascript', 'typescript', 'vue', 'css', 'html', 'bash', 'json']
    // },
    // markdown: {
    //   toc: {
    //     depth: 3,
    //     searchDepth: 3
    //   }
    // }
  },
  // SSG 配置
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/blog']
    }
  }
})
