# MeanC Blog

一个使用 Nuxt 3 + @nuxt/content 构建的现代化技术博客系统，支持
SSG（静态站点生成）。

## 特性

- 🚀 **Nuxt 3** - 使用最新的 Nuxt 3 框架
- 📝 **Markdown 支持** - 通过 @nuxt/content 模块处理 Markdown 文件
- ⚡️ **SSG** - 静态站点生成，性能优异
- 🎨 **UnoCSS** - 原子化 CSS 引擎
- 🌈 **代码高亮** - 内置代码语法高亮
- 📱 **响应式设计** - 完美适配各种设备
- 🔍 **SEO 友好** - 优秀的 SEO 支持

## 项目结构

```
meancblog/
├── app/
│   ├── components/          # Vue 组件
│   │   ├── BlogList.vue    # 博客列表组件
│   │   ├── Intro.vue       # 介绍组件
│   │   └── ...
│   ├── pages/              # 页面路由
│   │   ├── index.vue       # 首页
│   │   └── blog/
│   │       ├── index.vue   # 博客列表页
│   │       └── [slug].vue  # 博客详情页
│   └── app.vue             # 根组件
├── content/                # Markdown 内容目录
│   └── blog/               # 博客文章
│       ├── first-post.md
│       ├── vue-composition-api.md
│       └── typescript-tips.md
├── public/                 # 静态资源
├── nuxt.config.ts          # Nuxt 配置
└── package.json
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

启动开发服务器 `http://localhost:3000`：

```bash
pnpm dev
```

### 生成静态站点

构建并生成静态文件：

```bash
pnpm generate
```

生成的静态文件将在 `.output/public` 目录中。

### 预览生产版本

```bash
pnpm preview
```

## 如何添加博客文章

1. 在 `content/blog/` 目录下创建新的 Markdown 文件
2. 添加 frontmatter 元数据：

```markdown
---
title: '文章标题'
description: '文章描述'
date: '2026-01-05'
author: '作者名'
tags: ['标签1', '标签2']
cover: '封面图片URL（可选）'
---

# 文章内容

这里是你的 Markdown 内容...
```

3. 文件名将作为 URL slug（例如：`my-post.md` → `/blog/my-post`）

## 内容功能

### 支持的 Markdown 特性

- ✅ 标题、段落、列表
- ✅ 代码块与语法高亮
- ✅ 引用块
- ✅ 表格
- ✅ 图片
- ✅ 链接
- ✅ 目录（TOC）

### 代码高亮

支持多种编程语言的语法高亮：

```javascript
const greeting = "Hello, World!";
console.log(greeting);
```

## 配置

### Nuxt Content 配置

在 `nuxt.config.ts` 中配置：

```typescript
export default defineNuxtConfig({
  modules: ["@nuxt/content"],
  content: {
    highlight: {
      theme: "github-dark",
      preload: [
        "javascript",
        "typescript",
        "vue",
        "css",
        "html",
        "bash",
        "json",
      ],
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
    },
  },
});
```

### SSG 配置

Nuxt 会自动预渲染所有路由。确保在 `nitro.prerender` 中包含博客路由：

```typescript
nitro: {
  prerender: {
    crawlLinks: true,
    routes: ['/blog']
  }
}
```

## 部署

### Vercel

```bash
pnpm generate
```

然后将项目连接到 Vercel，它会自动检测并部署。

### Netlify

在 `netlify.toml` 中配置：

```toml
[build]
  command = "pnpm generate"
  publish = ".output/public"
```

### Cloudflare Pages

使用构建命令：`pnpm generate`，输出目录：`.output/public`

## 技术栈

- [Nuxt 3](https://nuxt.com/) - Vue.js 框架
- [@nuxt/content](https://content.nuxt.com/) - 文件驱动的内容管理
- [UnoCSS](https://unocss.dev/) - 即时原子化 CSS 引擎
- [TypeScript](https://www.typescriptlang.org/) - 类型安全

## License

MIT

````
Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
````

Check out the
[deployment documentation](https://nuxt.com/docs/getting-started/deployment) for
more information.
