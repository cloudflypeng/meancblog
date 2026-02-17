<template>
  <div class="paper-shell">
    <Title />
    <!-- Hero 部分 -->
    <section class="paper-block paper-hero">
      <Intro />
    </section>

    <!-- 博客预览部分 -->
    <section class="paper-block">
      <div class="news-head">
        <div class="news-badge">Latest Posts</div>
        <div class="news-meta">
          <span>精选 · 3 篇</span>
          <span class="divider-dot" />
          <NuxtLink to="/blog" class="news-more">更多内容请见 Blog</NuxtLink>
        </div>
      </div>
      <div v-if="latestArticles.length" class="news-mini-grid">
        <article v-for="(article, index) in latestArticles" :key="article.path" class="news-mini">
          <NuxtLink :to="article.path" class="news-mini-link">
            <div class="news-mini-kicker">Story {{ String(index + 1).padStart(2, '0') }}</div>
            <h3 class="news-mini-title">{{ article.title }}</h3>
            <p class="news-mini-desc">{{ article.description }}</p>
            <div class="news-mini-meta">
              <span>{{ article.author }}</span>
              <span class="news-mini-separator" />
              <time>{{ formatDate(article.date) }}</time>
            </div>
          </NuxtLink>
        </article>
      </div>
      <div v-else class="news-mini-empty">暂无文章发布</div>
    </section>

    <!-- 画册预览部分 -->
    <section class="paper-block">
      <div class="news-head">
        <div class="news-badge">Gallery</div>
        <div class="news-meta">
          <span>精选 · 3 张</span>
          <span class="divider-dot" />
          <span>随手影像</span>
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
    </section>

    <!-- 朋友们 -->
    <section class="paper-block">
      <div class="news-head">
        <div class="news-badge">Friends</div>
        <div class="news-meta">
          <span>友链 · {{ friends.length }}</span>
          <span class="divider-dot" />
          <span>一起写作的人</span>
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
.paper-shell {
  --ink: #1c1610;
  --muted: #5b5147;
  --rule: rgba(63, 50, 35, 0.22);
  --paper-bg: #f6f0e6;
  --paper-highlight: #fffaf3;
  --accent: rgb(var(--color-primary-500, 14 165 233));
  position: relative;
  max-width: 1180px;
  margin: 2.75rem auto 3.5rem;
  padding: 3.6rem 2.4rem 3.4rem;
  background: transparent;
  color: var(--ink);
  border: none;
  box-shadow: none;
  isolation: isolate;
  overflow: hidden;
}

.paper-shell::before {
  content: none;
}

.paper-shell::after {
  content: none;
}

.paper-block {
  position: relative;
  padding: 2.8rem 2.4rem 2.3rem;
  background: transparent;
  border-radius: 0;
  border: none;
  box-shadow: none;
  transition: transform 220ms ease;
  overflow: hidden;
}

.paper-block::before {
  content: none;
}

.paper-block::after {
  content: none;
}

.paper-block+.paper-block {
  margin-top: 0.9rem;
}

.paper-block:hover {
  transform: translateY(-3px);
}

.paper-hero {
  padding-top: 3.4rem;
}

.news-head {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.9rem;
  margin-bottom: 1.45rem;
  border-bottom: 2px solid rgba(63, 50, 35, 0.32);
}

.news-head::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 96px;
  height: 5px;
  background: linear-gradient(90deg, rgba(63, 50, 35, 0.5), transparent);
  opacity: 0.65;
}

.news-badge {
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.92rem;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: "Georgia", "Times New Roman", serif;
}

.news-badge::before {
  content: '';
  width: 34px;
  height: 2px;
  background: rgba(63, 50, 35, 0.7);
  display: inline-block;
  box-shadow: 0 2px 0 rgba(63, 50, 35, 0.08);
}

.news-meta {
  display: inline-flex;
  gap: 0.8rem;
  align-items: center;
  font-size: 0.84rem;
  color: rgba(91, 81, 71, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: var(--font-mono, 'Maple Mono', monospace);
}

.divider-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: currentColor;
  display: inline-block;
  opacity: 0.6;
}

.news-more {
  text-decoration: none;
  font-weight: 700;
  color: inherit;
  position: relative;
  padding-bottom: 2px;
  transition: color 0.2s ease, transform 0.2s ease;
}

.news-more::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), rgba(63, 50, 35, 0.6));
  transform-origin: left;
  transform: scaleX(0.2);
  transition: transform 0.2s ease;
}

.news-more:hover {
  color: var(--accent);
}

.news-more:hover::after {
  transform: scaleX(1);
}

.news-mini-grid {
  display: grid;
  gap: 1.75rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 900px) {
  .news-mini-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.news-mini {
  position: relative;
  padding: 1.4rem 1.2rem 1.2rem;
  background: rgba(255, 236, 200, 0.18);
  border: 1px dashed rgba(63, 50, 35, 0.28);
  border-radius: 10px;
  box-shadow: none;
  overflow: hidden;
  transition: transform 200ms ease, border-color 200ms ease, background-color 200ms ease, filter 200ms ease;
}

.news-mini::before {
  content: '';
  position: absolute;
  inset: 12px 12px auto 12px;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(63, 50, 35, 0.3) 12%, rgba(63, 50, 35, 0.5) 50%, rgba(63, 50, 35, 0.2) 88%, transparent 100%);
  opacity: 0.82;
}

.news-mini::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 10% 10%, rgba(63, 50, 35, 0.06), transparent 18%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.news-mini:hover {
  transform: translateY(-6px);
  border-color: rgba(63, 50, 35, 0.45);
  background: rgba(255, 236, 200, 0.24);
}

.news-mini:hover::after {
  opacity: 1;
}

.news-mini-link {
  position: relative;
  display: grid;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
}

.news-mini-link::after {
  content: '';
  position: absolute;
  inset: -12px -10px -10px -10px;
  border: 1px dashed rgba(63, 50, 35, 0.12);
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.news-mini:hover .news-mini-link::after {
  opacity: 1;
  transform: translateY(-2px);
}

.news-mini-kicker {
  font-size: 0.7rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(91, 81, 71, 0.8);
}

.news-mini-title {
  font-size: 1.12rem;
  font-weight: 800;
  line-height: 1.32;
  letter-spacing: -0.01em;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);
  transition: color 0.2s ease;
}

.news-mini:hover .news-mini-title {
  color: var(--accent);
}

.news-mini-desc {
  font-size: 0.95rem;
  line-height: 1.68;
  color: rgba(91, 81, 71, 0.82);
}

.news-mini-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(91, 81, 71, 0.7);
  font-family: var(--font-mono, 'Maple Mono', monospace);
}

.news-mini-separator {
  width: 10px;
  height: 1px;
  background: currentColor;
  display: inline-block;
}

.news-mini-empty {
  padding: 1.5rem 0 0.5rem;
  font-size: 0.95rem;
  color: rgba(91, 81, 71, 0.8);
}

.gallery-grid {
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 900px) {
  .gallery-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.gallery-card {
  position: relative;
  display: grid;
  gap: 0.9rem;
  cursor: pointer;
  padding: 0.9rem;
  background: rgba(255, 236, 200, 0.14);
  border: 1px dashed rgba(63, 50, 35, 0.26);
  border-radius: 12px;
  box-shadow: none;
  transition: transform 240ms ease, border-color 240ms ease, background-color 240ms ease;
}

.gallery-card::after {
  content: '';
  position: absolute;
  inset: 12px;
  border: 1px dashed rgba(63, 50, 35, 0.12);
  pointer-events: none;
  opacity: 0.7;
}

.gallery-card:hover {
  transform: translateY(-6px) rotate(-0.35deg);
  border-color: rgba(63, 50, 35, 0.45);
  background: rgba(255, 236, 200, 0.22);
}

.gallery-frame {
  width: 100%;
  overflow: hidden;
  background: rgba(148, 163, 184, 0.18);
  border: 1px solid rgba(63, 50, 35, 0.14);
  border-radius: 12px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: sepia(0.06) contrast(1.02);
  transition: transform 420ms ease, filter 420ms ease;
}

.gallery-card:hover .gallery-image {
  transform: scale(1.04);
  filter: sepia(0.02) saturate(1.05);
}

.gallery-caption {
  display: grid;
  gap: 0.35rem;
  border-top: 1px dashed rgba(63, 50, 35, 0.18);
  padding-top: 0.6rem;
}

.gallery-title {
  font-weight: 800;
  font-size: 0.98rem;
  letter-spacing: 0.01em;
}

.gallery-desc {
  font-size: 0.86rem;
  color: rgba(91, 81, 71, 0.78);
}

.friends-grid {
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 900px) {
  .friends-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.friend-card {
  display: flex;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
  position: relative;
  padding: 1rem 1rem 1rem 0;
  border: 1px dashed rgba(63, 50, 35, 0.26);
  border-radius: 12px;
  background: rgba(255, 236, 200, 0.14);
  box-shadow: none;
  transition: transform 200ms ease, border-color 200ms ease, background-color 200ms ease;
}

.friend-card::before {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  top: 14px;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(63, 50, 35, 0.35) 12%, rgba(63, 50, 35, 0.55) 50%, rgba(63, 50, 35, 0.25) 88%, transparent 100%);
  opacity: 0.7;
}

.friend-card:hover {
  transform: translateY(-4px);
  border-color: rgba(63, 50, 35, 0.45);
  background: rgba(255, 236, 200, 0.22);
}

.friend-avatar {
  width: 58px;
  height: 58px;
  overflow: hidden;
  background: rgba(148, 163, 184, 0.2);
  flex: 0 0 58px;
  border: 1px solid rgba(63, 50, 35, 0.14);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.6);
}

.friend-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.friend-info {
  display: grid;
  gap: 0.3rem;
}

.friend-name {
  font-weight: 800;
  font-size: 1.02rem;
  letter-spacing: -0.01em;
}

.friend-desc {
  font-size: 0.87rem;
  color: rgba(91, 81, 71, 0.78);
}

.friend-host {
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(91, 81, 71, 0.7);
  font-family: var(--font-mono, 'Maple Mono', monospace);
}

@media (max-width: 860px) {
  .paper-shell {
    padding: 2.6rem 1.2rem 3rem;
    border-left: none;
    border-right: none;
  }

  .paper-block {
    padding: 2.3rem 1.6rem 2.1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .paper-block,
  .news-mini,
  .gallery-card,
  .friend-card,
  .news-more,
  .gallery-image {
    transition: none !important;
    animation: none !important;
  }
}

:global(.dark) .paper-shell {
  --ink: #e5ecf5;
  --muted: #c5d0df;
  --rule: rgba(226, 232, 240, 0.22);
  --paper-bg: #0f172a;
  --paper-highlight: rgba(17, 24, 39, 0.82);
  background: transparent;
  border-color: transparent;
  box-shadow: none;
}

:global(.dark) .paper-shell::after {
  content: none;
}

:global(.dark) .paper-block {
  background: transparent;
  border: none;
  box-shadow: none;
}

:global(.dark) .paper-block::after {
  content: none;
}

:global(.dark) .news-head {
  border-bottom-color: rgba(226, 232, 240, 0.3);
}

:global(.dark) .news-head::after {
  background: linear-gradient(90deg, rgba(226, 232, 240, 0.5), transparent);
}

:global(.dark) .news-badge::before {
  background: rgba(226, 232, 240, 0.7);
}

:global(.dark) .news-meta {
  color: rgba(226, 232, 240, 0.78);
}

:global(.dark) .news-mini {
  background: rgba(17, 24, 39, 0.5);
  border-color: rgba(226, 232, 240, 0.22);
  box-shadow: none;
}

:global(.dark) .news-mini::before {
  background: linear-gradient(90deg, transparent 0%, rgba(226, 232, 240, 0.28) 18%, rgba(226, 232, 240, 0.5) 50%, rgba(226, 232, 240, 0.28) 82%, transparent 100%);
}

:global(.dark) .news-mini-kicker,
:global(.dark) .news-mini-meta {
  color: rgba(226, 232, 240, 0.72);
}

:global(.dark) .news-mini-desc {
  color: rgba(226, 232, 240, 0.84);
}

:global(.dark) .news-mini-empty {
  color: rgba(226, 232, 240, 0.7);
}

:global(.dark) .gallery-card {
  background: rgba(17, 24, 39, 0.55);
  border-color: rgba(226, 232, 240, 0.22);
  box-shadow: none;
}

:global(.dark) .gallery-card::after {
  border-color: rgba(226, 232, 240, 0.12);
}

:global(.dark) .gallery-frame {
  background: rgba(148, 163, 184, 0.2);
  border-color: rgba(226, 232, 240, 0.16);
}

:global(.dark) .gallery-desc {
  color: rgba(226, 232, 240, 0.78);
}

:global(.dark) .friend-card {
  background: rgba(17, 24, 39, 0.55);
  border-color: rgba(226, 232, 240, 0.22);
  box-shadow: none;
}

:global(.dark) .friend-card::before {
  background: linear-gradient(90deg, transparent 0%, rgba(226, 232, 240, 0.25) 12%, rgba(226, 232, 240, 0.5) 50%, rgba(226, 232, 240, 0.25) 88%, transparent 100%);
}

:global(.dark) .friend-desc {
  color: rgba(226, 232, 240, 0.82);
}

:global(.dark) .friend-host {
  color: rgba(226, 232, 240, 0.7);
}
</style>
