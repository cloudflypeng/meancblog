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
      friendsData
    }
  },
  content: {
    // 配置 Markdown 文件的处理
    highlight: {
      theme: 'github-dark',
      preload: ['javascript', 'typescript', 'vue', 'css', 'html', 'bash', 'json']
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      },
      anchorLinks: {
        depth: 3,
        exclude: [1]
      }
    }
  },

  // SSG 配置
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/']
    }
  }
})
