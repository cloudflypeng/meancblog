// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite"

const siteConfig = {
  site: {
    title: '喝酒不误事Meanc',
    description: 'Welcome to my personal blog',
    author: '喝酒不误事@Meanc',
    favicon: 'https://img.meanc.cc/blog/Peng%20Yunfei.jpg',
    logo: 'https://img.meanc.cc/blog/Peng%20Yunfei.jpg',
    url: 'https://meanc.cc'
  },
  seo: {
    keywords: 'blog, programming, web development',
    ogImage: '/og-image.png'
  },
  social: {
    github: {
      url: 'https://github.com/cloudflypeng',
      icon: 'i-simple-icons-github',
      bg: '#374151',
      hoverBg: '#1f2937'
    },
    x: {
      url: 'https://twitter.com/meanc_p',
      icon: 'i-simple-icons-x',
      bg: '#000000',
      hoverBg: '#111827'
    },
    discord: {
      url: 'https://discord.gg/t77kfdaG',
      icon: 'i-simple-icons-discord',
      bg: '#5865F2',
      hoverBg: '#4752C4'
    },
    afdian: {
      url: 'https://afdian.com/a/meanc',
      icon: 'i-simple-icons-afdian',
      bg: '#5e2299',
      hoverBg: '#5e2299'
    }
  },
  navigation: {
    showHeader: true,
    showFooter: true
  }
}

const friendsData = [
  {
    "name": "Hakadao",
    "avatar": "https://img.meanc.cc/blog/hakadao.jpg",
    "url": "https://hakadao.cc/",
    "desc": ""
  }
]


export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/content'],
  css: ['./app/assets/css/main.css', './app/assets/css/new.css', './app/assets/css/font.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'dark',
  },
  app: {
    head: {
      title: siteConfig.site.title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: siteConfig.site.description },
        { name: 'author', content: siteConfig.site.author },
        { property: 'og:title', content: siteConfig.site.title },
        { property: 'og:description', content: siteConfig.site.description },
        { property: 'og:image', content: siteConfig.seo.ogImage }
      ],
      link: [
        { rel: 'icon', href: siteConfig.site.favicon }
      ]
    }
  },
  runtimeConfig: {
    public: {
      siteConfig,
      friendsData,
      syncToken: process.env.NUXT_SYNC_TOKEN
    }
  },
  routeRules: {
    '/proxy/sync': {
      proxy: { to: 'https://sync.meanc.cc/api/active_app' },
      cors: true
    },
    // 混合渲染配置：大幅提升访问速度
    // 首页和主要页面：预渲染 (构建时生成 HTML)
    '/': { prerender: true },
    '/friends': { prerender: true },
    '/project': { prerender: true },

    // 博客文章：ISR (增量静态再生)
    // 允许在不重新部署的情况下，并在后台更新页面缓存 (例如每小时更新一次)
    '/blog/**': { isr: 3600 },

    // API 路由保持默认 (Serverless Function)
    // 注意：Vercel Serverless 对 SSE 长连接有时间限制 (10s-60s)
    '/api/**': { cors: true },
  },
  nitro: {
    preset: 'vercel',
    prerender: {
      crawlLinks: false,
      routes: ['/']
    }
  }
})
