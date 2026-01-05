---
title: 'Nuxt 3 SSG 博客搭建指南'
description: '学习如何使用 Nuxt 3 和 @nuxt/content 模块搭建一个静态博客站点'
date: '2026-01-05'
author: 'MeanC'
tags: ['Nuxt', 'Vue', 'SSG']
cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format'
---

# Nuxt 3 SSG 博客搭建指南

欢迎来到第一篇博客文章！这篇文章将介绍如何使用 Nuxt 3
搭建一个静态生成的博客系统。

## 为什么选择 Nuxt 3？

Nuxt 3 是一个强大的 Vue.js 框架，提供了许多开箱即用的功能：

- 🚀 **自动路由**：基于文件系统的路由
- 📝 **Markdown 支持**：通过 @nuxt/content 模块
- ⚡️ **SSG/SSR**：灵活的渲染模式
- 🎨 **丰富的生态**：大量优质模块

## 快速开始

### 安装依赖

```bash
pnpm add @nuxt/content
```

### 配置 nuxt.config.ts

```typescript
export default defineNuxtConfig({
  modules: ["@nuxt/content"],
  content: {
    highlight: {
      theme: "github-dark",
    },
  },
});
```

## Markdown 功能展示

### 代码高亮

```javascript
const greeting = "Hello, Nuxt!";
console.log(greeting);
```

### 引用块

> "简洁是可靠的前提。" — Edsger W. Dijkstra

### 列表

1. 创建内容目录
2. 编写 Markdown 文件
3. 创建页面组件
4. 生成静态站点

## 总结

使用 Nuxt 3 和
@nuxt/content，你可以轻松构建一个功能强大、性能优秀的博客系统。开始你的创作之旅吧！
