<script setup lang="ts">
import TxextoverDom from '~/components/TextoverDom.vue'
const { siteConfig } = useRuntimeConfig().public

const isVisible = ref(false)

onMounted(() => {
  // 使用 requestAnimationFrame 确保 DOM 已渲染
  requestAnimationFrame(() => {
    isVisible.value = true
  })
})
</script>

<template>
  <ClientOnly>
    <section class="news-hero">
      <div class="news-shell">
        <div class="news-grid">
          <!-- 左侧文本内容 -->
          <Transition enter-active-class="transition-all duration-900 ease-out"
            enter-from-class="opacity-0 -translate-y-6" enter-to-class="opacity-100 translate-y-0">
            <div v-show="isVisible" class="news-main">
              <div class="news-kicker">Feature Story</div>
              <header class="news-header">
                <h1 class="news-title">Hi, I'm {{ siteConfig.site.author }}</h1>
                <p class="news-deck">Design-driven frontend &amp; product thinker</p>
                <div class="news-byline">
                  <span>By {{ siteConfig.site.author }}</span>
                  <span class="news-separator" />
                  <span>Remote · GMT+8</span>
                </div>
              </header>
              <div class="news-body">
                <p class="news-lead">
                  Specialized in Vue, React, TypeScript, and building accessible, high-performance web applications.
                  {{ siteConfig.site.description }}
                </p>
                <div class="news-meta">
                  <div class="meta-line">
                    <span class="meta-label">Focus</span>
                    <span class="meta-value">Calm UX · System thinking · Motion craft</span>
                  </div>
                  <div class="meta-line">
                    <span class="meta-label">Coverage</span>
                    <span class="meta-value">Frontend · Design systems · DX</span>
                  </div>
                </div>
              </div>
              <div class="news-actions">
                <SocialLinks />
              </div>
              <div class="news-activity">
                <GithubActivity />
              </div>
            </div>
          </Transition>

          <!-- 右侧头像 -->
          <Transition enter-active-class="transition-all duration-900 ease-out delay-150"
            enter-from-class="opacity-0 translate-y-6 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100">
            <div v-show="isVisible" class="news-sidebar">
              <div class="news-tag">Cover Photo</div>
              <div class="news-photo">
                <TxextoverDom class="mb-4" text="❤ MADE WITH LOVE ❤ MEANC And DRANKING "
                  :img-src="siteConfig.site.logo" />
              </div>
              <div class="news-caption">Latest works, thoughts, and experiments.</div>
            </div>
          </Transition>
        </div>
      </div>
    </section>
  </ClientOnly>
</template>

<style scoped>
.news-hero {
  --news-accent: rgb(var(--color-primary-500, 14 165 233));
  --news-ink: #0f172a;
  --news-muted: #475569;
  --news-border: rgba(148, 163, 184, 0.3);
  font-family: "Georgia", "Times New Roman", serif;
  color: var(--news-ink);
}

.news-shell {
  max-width: 1000px;
  margin: 0 auto;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 2.5rem;
}

@media (min-width: 1024px) {
  .news-grid {
    grid-template-columns: 2.1fr 1fr;
  }
}

.news-main {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.news-kicker {
  font-size: 0.7rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--news-muted);
}

.news-header {
  display: grid;
  gap: 0.5rem;
  padding-bottom: 1rem;
}

.news-title {
  font-size: clamp(2.4rem, 4.2vw, 3.6rem);
  line-height: 1.05;
  letter-spacing: -0.01em;
  font-weight: 800;
}

.news-deck {
  font-size: 1.1rem;
  font-style: italic;
  color: var(--news-muted);
}

.news-byline {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--news-muted);
}

.news-separator {
  width: 5px;
  height: 5px;
  background: currentColor;
  display: inline-block;
}

.news-body {
  display: grid;
  gap: 1rem;
}

.news-lead {
  font-size: 1rem;
  line-height: 1.85;
  color: var(--news-muted);
}

.news-meta {
  padding-left: 1rem;
  display: grid;
  gap: 0.4rem;
  color: var(--news-ink);
}

.meta-line {
  display: flex;
  gap: 0.75rem;
  font-size: 0.95rem;
  align-items: baseline;
}

.meta-label {
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--news-muted);
  font-size: 0.7rem;
}

.meta-value {
  color: var(--news-ink);
}

.news-actions {
  margin-top: 0.25rem;
}

.news-activity {
  margin-top: 0.35rem;
}

.news-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}

.news-tag {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--news-muted);
}

.news-photo {
  width: 100%;
  padding: 14px;
  background: rgba(255, 255, 255, 0.6);
}

.news-caption {
  font-size: 0.88rem;
  color: var(--news-muted);
}

:global(.dark) .news-hero {
  --news-ink: #e2e8f0;
  --news-muted: #cbd5e1;
  --news-border: rgba(148, 163, 184, 0.35);
}


:deep(.textover-dom) {
  --textover-glow-color: rgba(168, 85, 247, 0.5);
}

:global(.dark) :deep(.textover-dom) {
  --textover-glow-color: rgba(192, 132, 252, 0.6);
}

:global(.dark) .news-lead {
  color: rgba(226, 232, 240, 0.92);
}
</style>
