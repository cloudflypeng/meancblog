<template>
  <div class="min-h-screen py-12 relative overflow-hidden">

    <!-- 职业里程碑 -->
    <section class="mb-16 relative paper-section">
      <div class="flex flex-col items-center text-center mb-24 fade-up">
        <span
          class="text-primary/80 dark:text-primary/70 font-mono text-xs tracking-[0.3em] uppercase mb-4">Company
          Projects</span>
        <h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">企业项目</h2>
        <p class="mt-4 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
          聚焦真实业务场景，以稳定性、可维护性与体验细节为核心的企业级项目实践。
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div v-for="project in companyProjects" :key="project.name" class="group relative">
          <div class="relative" @click="goTo(project.url)">
            <div
              class="relative soft-card bg-white/80 dark:bg-gray-900/60 backdrop-blur-md border border-gray-100/80 dark:border-gray-800/80 p-7 md:p-8 rounded-3xl transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1.5 hover:border-primary/30 group-hover:bg-white dark:group-hover:bg-gray-900 group/card">
              <div class="card-glow" aria-hidden="true"></div>

              <div class="flex items-center justify-between mb-5">
                <div v-if="project.year" class="text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-[0.2em]">
                  {{ project.year }}
                </div>
                <UIcon v-if="project.url" name="i-heroicons-arrow-up-right-20-solid"
                  class="w-5 h-5 text-gray-300 group-hover/card:text-primary group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 transition-all" />
              </div>

              <!-- Tech Stack Badges -->
              <div class="flex flex-wrap gap-2 mb-5">
                <span v-for="tech in (project.techStack?.split(',').slice(0, 3) || [])" :key="tech"
                  class="soft-chip px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-800/80 rounded-md border border-gray-200/80 dark:border-gray-700/80 group-hover/card:border-primary/20 dark:group-hover/card:border-primary/30 transition-colors">
                  {{ tech.trim() }}
                </span>
              </div>

              <h3
                class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover/card:text-primary transition-colors">
                {{ project.name }}
              </h3>

              <div v-if="project.role"
                class="text-sm font-medium text-primary/80 dark:text-primary/70 mb-4 tracking-wide uppercase opacity-80">
                {{ project.role }}
              </div>

              <p
                class="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base group-hover/card:text-gray-900 dark:group-hover/card:text-gray-300 transition-colors">
                {{ project.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 开源项目 (保持原有风格但微调间距) -->
    <section class="mt-20 paper-section">
      <div class="flex flex-col items-center text-center mb-14 fade-up">
        <span class="text-primary/80 dark:text-primary/70 font-mono text-xs tracking-[0.3em] uppercase mb-4">Open
          Source</span>
        <h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">社区贡献与实验</h2>
        <p class="mt-4 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
          开源、实验与探索性作品，强调可复用性与技术美感。
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="project in opensourceProjects" :key="project.name"
          class="group relative rounded-3xl p-6 bg-gray-50/80 dark:bg-gray-800/30 border border-transparent hover:border-gray-200/80 dark:hover:border-gray-700/80 transition-all duration-500 hover:bg-white dark:hover:bg-gray-800 cursor-pointer overflow-hidden soft-card flex flex-col h-full"
          @click="goTo(project.url)">
          <div class="card-glow" aria-hidden="true"></div>

          <div class="flex justify-between items-start mb-6">
            <div
              class="p-3 rounded-xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-100 dark:ring-gray-800 group-hover:scale-105 transition-transform duration-300 soft-float">
              <UIcon name="i-mdi-github" class="icon-single w-6 h-6 text-gray-900 dark:text-white" />
            </div>
            <UIcon name="i-heroicons-arrow-up-right-20-solid"
              class="icon-single w-5 h-5 text-gray-300 group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
          </div>

          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
            {{ project.name }}
          </h3>

          <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
            {{ project.description }}
          </p>

          <div class="flex items-center justify-between border-t border-gray-100 dark:border-gray-700/80 pt-4 mt-auto">
            <div v-if="project.techStack" class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-primary/80"></span>
              <span class="text-xs text-gray-500 font-mono">{{ project.techStack.split(',')[0] }}</span>
            </div>

            <div class="flex items-center gap-3 text-xs text-gray-400">
              <span v-if="project.stars !== undefined"
                class="flex items-center gap-1 group-hover:text-yellow-500 transition-colors">
                <UIcon name="i-heroicons-star-20-solid" class="icon-single w-3 h-3" /> {{ project.stars }}
              </span>
              <span v-if="project.forks !== undefined" class="flex items-center gap-1">
                <UIcon name="i-heroicons-code-bracket-20-solid" class="icon-single w-3 h-3" /> {{ project.forks }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.soft-card {
  position: relative;
  isolation: isolate;
  transition: transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease;
}

.card-glow {
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: radial-gradient(circle at top, rgba(59, 130, 246, 0.16), transparent 60%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  z-index: -1;
}

.soft-card:hover .card-glow {
  opacity: 1;
}

.soft-chip {
  backdrop-filter: blur(6px);
}

.soft-float {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.soft-card:hover .soft-float {
  transform: translateY(-2px);
}

.icon-single :deep(svg + svg) {
  display: none;
}

.fade-up {
  animation: fadeUp 0.8s ease both;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-beam,
  .fade-up {
    animation: none;
  }
  .soft-card,
  .soft-float {
    transition: none;
  }
}

.paper-section {
  border-top: 1px solid rgba(148, 163, 184, 0.25);
  padding-top: 1.5rem;
}

:global(.dark) .paper-section {
  border-top-color: rgba(148, 163, 184, 0.2);
}
</style>

<script setup lang="ts">
import projects from '~/data/projects.json'

useHead({
  title: 'Projects - MeanC Blog',
  meta: [
    {
      name: 'description',
      content: 'MeanC 的项目经历与作品展示，包括前端开发、SaaS平台、Indie 开发项目等。'
    }
  ]
})

interface Project {
  type: 'company' | 'opensource'
  name: string
  role?: string
  year?: string
  techStack?: string
  description: string
  url: string
  stars?: number
  forks?: number
  language?: string
  languageColor?: string
}

interface GithubResponse {
  projects: Project[]
  error?: string
}

const companyProjects = (projects as Project[]).filter(p => p.type === 'company')

// 获取 GitHub pinned 项目
const { data: githubData } = await useFetch<GithubResponse>('/api/github-pinned')
const opensourceProjects = computed(() => {
  if (githubData.value?.projects && githubData.value.projects.length > 0) {
    return githubData.value.projects
  }
  // 降级到静态数据
  return (projects as Project[]).filter(p => p.type === 'opensource')
})

function goTo(url: string) {
  if (!url) return
  window.open(url, '_blank')
}
</script>
