<template>
  <div class="bento-shell">
    <div class="bento-top">
      <Title />
    </div>

    <section class="bento-grid">
      <!-- Hero -->
      <div class="bento-card bento-hero">
        <div class="card-head">
          <div class="card-title">Introduction</div>
        </div>
        <div class="hero-wrap">
          <Intro />
          <div class="hero-foot">
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-label">Focus</div>
                <div class="stat-value">Design systems</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">Stack</div>
                <div class="stat-value">Nuxt · Vue · TS</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Posts -->
      <div class="bento-card bento-posts">
        <div class="card-head">
          <div class="card-title">Latest Posts</div>
          <div class="card-actions">
            <NuxtLink to="/blog" class="card-link">View All</NuxtLink>
          </div>
        </div>

        <div v-if="latestArticles.length" class="posts-grid">
          <article v-if="latestArticles[0]" class="post-feature">
            <NuxtLink :to="latestArticles[0].path" class="post-link">
              <h2 class="post-title">{{ latestArticles[0].title }}</h2>
              <p class="post-desc">{{ latestArticles[0].description }}</p>
              <div class="post-meta">
                <span>{{ latestArticles[0].author }}</span>
                <span class="meta-dot" />
                <time>{{ formatDate(latestArticles[0].date) }}</time>
              </div>
            </NuxtLink>
          </article>

          <div class="post-list">
            <article v-for="(article, index) in latestArticles.slice(1)" :key="article.path" class="post-mini">
              <NuxtLink :to="article.path" class="post-link">
                <div class="post-mini-body">
                  <h3 class="post-mini-title">{{ article.title }}</h3>
                  <p class="post-mini-desc">{{ article.description }}</p>
                  <div class="post-meta">
                    <span>{{ article.author }}</span>
                    <span class="meta-dot" />
                    <time>{{ formatDate(article.date) }}</time>
                  </div>
                </div>
              </NuxtLink>
            </article>
          </div>
        </div>
        <div v-else class="post-empty">暂无文章发布</div>
      </div>

      <!-- Gallery -->
      <div class="bento-card bento-gallery">
        <div class="card-head">
          <div class="card-title">Gallery</div>
          <div class="card-actions">
            <span class="card-subtitle">Three recent shots</span>
          </div>
        </div>
        <div class="gallery-grid">
          <article v-for="item in galleryItems" :key="item.id" class="gallery-card" @click="openLightbox(item)">
            <div class="gallery-frame" :style="{ aspectRatio: item.aspectRatio }">
              <img :src="item.url" :alt="item.title" class="gallery-image" loading="lazy" />
            </div>
            <div class="gallery-caption">
              <div class="gallery-title">{{ item.title }}</div>
              <div class="gallery-desc">{{ item.description }}</div>
            </div>
          </article>
        </div>
      </div>

      <!-- Friends -->
      <div class="bento-card bento-friends">
        <div class="card-head">
          <div class="card-title">Friends</div>
          <div class="card-actions">
            <span class="card-subtitle">{{ friends.length }} people</span>
          </div>
        </div>
        <div class="friends-grid">
          <a v-for="friend in friends" :key="friend.name" :href="friend.url" target="_blank" rel="noopener noreferrer"
            class="friend-card">
            <div class="friend-avatar">
              <img :src="friend.avatar" :alt="friend.name" loading="lazy" />
            </div>
            <div class="friend-info">
              <div class="friend-name">{{ friend.name }}</div>
              <div v-if="friend.desc" class="friend-desc">{{ friend.desc }}</div>
              <div class="friend-host">{{ formatHost(friend.url) }}</div>
            </div>
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div class="bento-card bento-colophon">
        <div class="colophon-content">
          <span>Published by {{ siteConfig.site.author }}</span>
          <span class="colophon-sep">·</span>
          <span>Built with Nuxt</span>
          <span class="colophon-sep">·</span>
          <span>Vol. {{ currentYear }}</span>
        </div>
        <div class="colophon-sub">Design with clarity.</div>
      </div>
    </section>

    <Lightbox v-if="selectedImage" v-model="isLightboxOpen" :image="selectedImage!" :current-index="currentIndex"
      :total="galleryItems.length" @previous="previousImage" @next="nextImage" />
  </div>
</template>

<script setup lang="ts">
import Intro from '~/part/Hero.vue'
import Title from '~/part/main/Title.vue'
import type { BlogArticle } from '~/types/content'
import galleryData from '~/data/gallery.json'
import Lightbox from '~/components/Lightbox.vue'

interface Friend {
  name: string
  avatar: string
  url: string
  desc?: string
}

interface GalleryImage {
  id: number
  url: string
  title: string
  description: string
  aspectRatio: string
}

const { siteConfig } = useRuntimeConfig().public
const currentYear = new Date().getFullYear()

// 根据今年的天数算"期号"
const startOfYear = new Date(currentYear, 0, 1)
const issueNumber = Math.ceil((Date.now() - startOfYear.getTime()) / (1000 * 60 * 60 * 24))

const { data: articles } = await useAsyncData('home-news', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

const latestArticles = computed<BlogArticle[]>(() => articles.value?.slice(0, 3) ?? [])
const galleryItems = computed<GalleryImage[]>(() => galleryData.slice(0, 3))
const friends = computed<Friend[]>(() => useRuntimeConfig().public.friendsData ?? [])

const selectedImage = ref<GalleryImage | null>(null)

const isLightboxOpen = computed({
  get: () => selectedImage.value !== null,
  set: (value) => {
    if (!value) selectedImage.value = null
  }
})

const currentIndex = computed(() => {
  return selectedImage.value
    ? galleryItems.value.findIndex(img => img.id === selectedImage.value!.id)
    : 0
})

const openLightbox = (image: GalleryImage) => {
  selectedImage.value = image
}

const previousImage = () => {
  if (!selectedImage.value) return
  const index = currentIndex.value
  const prevIndex = index <= 0 ? galleryItems.value.length - 1 : index - 1
  const prev = galleryItems.value[prevIndex]
  if (prev) selectedImage.value = prev
}

const nextImage = () => {
  if (!selectedImage.value) return
  const index = currentIndex.value
  const nextIndex = index >= galleryItems.value.length - 1 ? 0 : index + 1
  const next = galleryItems.value[nextIndex]
  if (next) selectedImage.value = next
}

const handleKeyboard = (event: KeyboardEvent) => {
  if (!selectedImage.value) return
  if (event.key === 'ArrowLeft') previousImage()
  if (event.key === 'ArrowRight') nextImage()
  if (event.key === 'Escape') selectedImage.value = null
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyboard)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyboard)
})

const formatHost = (url: string) => {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

useHead({
  title: 'MeanC Blog',
  meta: [
    {
      name: 'description',
      content: '一个使用 Nuxt 3 构建的技术博客，分享前端开发、Vue、TypeScript 等技术文章'
    }
  ]
})
</script>

<style scoped>
/* ================================================================
   BENTO GRID STYLE
   ================================================================ */
.bento-shell {
  --ink: #111827;
  --muted: #6b7280;
  --accent: rgb(var(--color-primary-500, 14 165 233));
  --card: #ffffff;
  --card-soft: #f5f7fa;
  --border: rgba(15, 23, 42, 0.08);
  position: relative;
  max-width: 1200px;
  margin: 2.4rem auto 3.5rem;
  padding: 2.8rem 2rem 3.4rem;
  color: var(--ink);
  font-family: "Maple", "SF Pro Text", "PingFang SC", "Microsoft YaHei", sans-serif;
  isolation: isolate;
}

.bento-shell::before {
  content: none;
}

.bento-top {
  margin-bottom: 1.6rem;
  padding: 1.8rem;
  border-radius: 26px;
  background: var(--card);
  border: 1px solid var(--border);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
}

.bento-top :deep(.masthead) {
  border-bottom: none;
  padding-bottom: 0;
}

.bento-top :deep(.masthead-title) {
  letter-spacing: 0.02em;
  text-transform: none;
}

.bento-top :deep(.masthead-subtitle) {
  letter-spacing: 0.14em;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-auto-rows: minmax(140px, auto);
  gap: 1.6rem;
}

.bento-card {
  position: relative;
  padding: 1.7rem;
  border-radius: 26px;
  background: var(--card);
  border: 1px solid var(--border);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
  transition: transform 180ms ease, box-shadow 180ms ease;
  overflow: hidden;
}

.bento-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(140deg, rgba(14, 165, 233, 0.04), transparent 55%);
  opacity: 0;
  transition: opacity 180ms ease;
  pointer-events: none;
}

.bento-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 22px 50px rgba(15, 23, 42, 0.1);
}

.bento-card:hover::after {
  opacity: 1;
}

.bento-hero {
  grid-column: span 7;
  grid-row: span 2;
}

.bento-hero :deep(.news-hero) {
  font-family: "Maple", "SF Pro Text", "PingFang SC", "Microsoft YaHei", sans-serif;
}

.bento-hero :deep(.news-shell) {
  max-width: 100%;
}

.bento-hero :deep(.news-photo) {
  border-radius: 16px;
}

.hero-wrap {
  display: grid;
  gap: 1.2rem;
}

.hero-foot {
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  padding-top: 1rem;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.stat-item {
  background: var(--card-soft);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 0.9rem 1rem;
  display: grid;
  gap: 0.3rem;
}

.stat-label {
  font-size: 0.7rem;
  text-transform: none;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.stat-value {
  font-weight: 600;
}

.bento-posts {
  grid-column: span 5;
  grid-row: span 2;
}

.bento-gallery {
  grid-column: span 7;
  grid-row: span 2;
}

.bento-friends {
  grid-column: span 5;
  grid-row: span 2;
}

.bento-colophon {
  grid-column: span 12;
  text-align: center;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.2rem;
  flex-wrap: wrap;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.card-tag {
  font-size: 0.7rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--muted);
}

.card-meta {
  font-size: 0.8rem;
  color: var(--muted);
}

.card-actions {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
}

.card-subtitle {
  font-size: 0.85rem;
  color: var(--muted);
}

.card-chip {
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.05);
  font-size: 0.75rem;
  color: var(--muted);
}

.card-link {
  text-decoration: none;
  font-weight: 600;
  color: var(--ink);
  transition: color 0.2s ease;
}

.card-link:hover {
  color: var(--accent);
}

/* Posts */
.posts-grid {
  display: grid;
  gap: 1rem;
}

.post-feature {
  background: var(--card-soft);
  border-radius: 20px;
  border: 1px solid var(--border);
  padding: 1.2rem 1.4rem 1.4rem;
  position: relative;
}

.post-list {
  display: grid;
  gap: 0.9rem;
}

.post-mini {
  background: rgba(15, 23, 42, 0.02);
  border-radius: 18px;
  border: 1px solid var(--border);
  padding: 1rem 1.2rem;
}

.post-link {
  display: grid;
  gap: 0.55rem;
  text-decoration: none;
  color: inherit;
}

.post-title {
  font-size: 1.4rem;
  line-height: 1.25;
  font-weight: 700;
}

.post-desc {
  color: var(--muted);
  line-height: 1.75;
}

.post-mini-title {
  font-size: 1.08rem;
  font-weight: 700;
}

.post-mini-body {
  display: grid;
  gap: 0.5rem;
}

.post-mini-desc {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.6;
}

.post-meta {
  display: inline-flex;
  gap: 0.6rem;
  align-items: center;
  font-size: 0.72rem;
  letter-spacing: 0.02em;
  text-transform: none;
  color: var(--muted);
}

.meta-dot {
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: currentColor;
  opacity: 0.6;
}

.post-empty {
  padding: 1.2rem 0;
  color: var(--muted);
}

/* Gallery */
.gallery-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 900px) {
  .gallery-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.gallery-card {
  display: grid;
  gap: 0.6rem;
  cursor: pointer;
  padding: 0.6rem;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.02);
  border: 1px solid var(--border);
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.gallery-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
}

.gallery-frame {
  width: 100%;
  overflow: hidden;
  border-radius: 14px;
  background: rgba(148, 163, 184, 0.2);
  position: relative;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 300ms ease;
}

.gallery-card:hover .gallery-image {
  transform: scale(1.04);
}

.gallery-caption {
  display: grid;
  gap: 0.2rem;
}

.gallery-title {
  font-weight: 600;
}

.gallery-desc {
  font-size: 0.8rem;
  color: var(--muted);
}

/* Friends */
.friends-grid {
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 720px) {
  .friends-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.friend-card {
  display: flex;
  gap: 0.8rem;
  text-decoration: none;
  color: inherit;
  padding: 0.9rem 1rem;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.02);
  border: 1px solid var(--border);
  transition: transform 200ms ease, box-shadow 200ms ease;
  align-items: center;
  justify-content: flex-start;
}

.friend-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
}

.friend-avatar {
  width: 42px;
  height: 42px;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(148, 163, 184, 0.2);
  flex: 0 0 42px;
}

.friend-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.friend-info {
  display: grid;
  gap: 0.1rem;
  min-width: 0;
  flex: 1;
}

.friend-name {
  font-weight: 700;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.friend-desc {
  font-size: 0.8rem;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.friend-host {
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  font-family: var(--font-mono, "Maple Mono", monospace);
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.colophon-content {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  text-transform: none;
  color: var(--muted);
}

.colophon-sep {
  opacity: 0.5;
}

.colophon-sub {
  margin-top: 0.6rem;
  color: var(--muted);
  font-size: 0.85rem;
}

/* Responsive */
@media (max-width: 1100px) {
  .bento-hero,
  .bento-posts,
  .bento-gallery,
  .bento-friends {
    grid-column: span 12;
  }
}

@media (max-width: 720px) {
  .bento-shell {
    padding: 2rem 1.2rem 3rem;
  }

  .bento-card {
    padding: 1.3rem;
  }

  .hero-stats {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media (prefers-reduced-motion: reduce) {
  .bento-card,
  .gallery-card,
  .friend-card,
  .gallery-image {
    transition: none !important;
    animation: none !important;
  }
}

/* Dark mode */
:global(.dark) .bento-shell {
  --ink: #e2e8f0;
  --muted: #94a3b8;
  --card: rgba(15, 23, 42, 0.85);
  --card-soft: rgba(30, 41, 59, 0.85);
  --border: rgba(148, 163, 184, 0.22);
}

:global(.dark) .bento-card {
  box-shadow: 0 20px 50px rgba(2, 6, 23, 0.45);
}

:global(.dark) .card-chip {
  background: rgba(148, 163, 184, 0.15);
}

:global(.dark) .gallery-card,
:global(.dark) .friend-card,
:global(.dark) .post-mini {
  background: rgba(148, 163, 184, 0.08);
}

:global(.dark) .post-desc,
:global(.dark) .post-mini-desc,
:global(.dark) .gallery-desc,
:global(.dark) .friend-desc,
:global(.dark) .colophon-content {
  color: var(--muted);
}
</style>
