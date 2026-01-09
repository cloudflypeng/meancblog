<template>
  <div class="min-h-screen py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">

    <!-- 职业里程碑 -->
    <section class="mb-32 relative">
      <div class="flex flex-col items-center text-center mb-30">
        <span class="text-blue-500 dark:text-blue-400 font-mono text-sm tracking-widest uppercase mb-4">Compony
          Project</span>
        <h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">企业项目</h2>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Timeline line -->
        <div
          class="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 dark:via-gray-800 to-transparent md:-translate-x-1/2">
          <div
            class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent animate-beam">
          </div>
        </div>

        <div class="space-y-24">
          <div v-for="(project, index) in companyProjects" :key="project.name"
            class="group relative flex flex-col md:flex-row gap-12 items-center"
            :class="[index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse text-right']">

            <!-- Timeline dot -->
            <div
              class="absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-2 border-white dark:border-gray-950 bg-gray-200 dark:bg-gray-800 shadow-[0_0_0_4px_rgba(255,255,255,0.5)] dark:shadow-[0_0_0_4px_rgba(3,7,18,0.5)] md:-translate-x-1/2 z-10 group-hover:bg-blue-500 group-hover:scale-125 transition-all duration-500">
              <div
                class="absolute inset-0 rounded-full bg-blue-400/50 animate-ping opacity-0 group-hover:opacity-100 transition-opacity">
              </div>
            </div>

            <!-- Spacer for the other side -->
            <div class="hidden md:block flex-1"></div>

            <!-- Date Label (Desktop) - Opposing side -->
            <div class="hidden md:flex flex-1 items-center"
              :class="[index % 2 === 0 ? 'justify-end pr-12' : 'justify-start pl-12 order-first']">
              <span
                class="text-6xl font-bold text-gray-100 dark:text-gray-800/50 select-none transition-colors duration-500 group-hover:text-blue-500/10">
                {{ project.year }}
              </span>
            </div>

            <!-- Content card container (Mobile: Full width with padding left) -->
            <div class="w-full pl-20 md:pl-0 md:w-[calc(50%-3rem)] md:absolute md:top-1/2 md:-translate-y-1/2"
              :class="[index % 2 === 0 ? 'md:right-0 md:text-left' : 'md:left-0 md:text-right']">

              <!-- Mobile Year -->
              <div
                class="md:hidden absolute left-2 top-0 text-sm font-bold text-gray-400 rotate-90 origin-left translate-y-8">
                {{ project.year }}</div>

              <div class="relative perspective-1000" @click="goTo(project.url)">
                <div
                  class="relative bg-white/80 dark:bg-gray-900/60 backdrop-blur-md border border-gray-100 dark:border-gray-800 p-8 rounded-2xl transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:border-blue-500/30 group-hover:bg-white dark:group-hover:bg-gray-900 group/card">

                  <!-- Tech Stack Floating Badges -->
                  <div class="flex flex-wrap gap-2 mb-6" :class="[index % 2 !== 0 ? 'md:justify-end' : '']">
                    <span v-for="tech in (project.techStack?.split(',').slice(0, 3) || [])" :key="tech"
                      class="px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 group-hover/card:border-blue-200 dark:group-hover/card:border-blue-800/50 transition-colors">
                      {{ tech.trim() }}
                    </span>
                  </div>

                  <h3
                    class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors flex items-center gap-3"
                    :class="[index % 2 !== 0 ? 'md:flex-row-reverse' : '']">
                    {{ project.name }}
                    <UIcon v-if="project.url" name="i-heroicons-arrow-up-right-20-solid"
                      class="w-5 h-5 opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all text-blue-500" />
                  </h3>

                  <div v-if="project.role"
                    class="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4 tracking-wide uppercase opacity-80">
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
        </div>
      </div>
    </section>

    <!-- 开源项目 (保持原有风格但微调间距) -->
    <section class="mt-48">
      <div class="flex flex-col items-center text-center mb-16">
        <span class="text-blue-500 dark:text-blue-400 font-mono text-sm tracking-widest uppercase mb-4">Open
          Source</span>
        <h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">社区贡献与实验</h2>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="project in opensourceProjects" :key="project.name"
          class="group relative rounded-2xl p-6 bg-gray-50 dark:bg-gray-800/30 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 cursor-pointer overflow-hidden"
          @click="goTo(project.url)">

          <div class="flex justify-between items-start mb-6">
            <div
              class="p-3 rounded-xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-100 dark:ring-gray-800 group-hover:scale-110 transition-transform duration-300">
              <UIcon name="i-mdi-github" class="w-6 h-6 text-gray-900 dark:text-white" />
            </div>
            <UIcon name="i-heroicons-arrow-up-right-20-solid"
              class="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
          </div>

          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
            {{ project.name }}
          </h3>

          <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
            {{ project.description }}
          </p>

          <div class="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
            <div v-if="project.techStack" class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-green-500"></span>
              <span class="text-xs text-gray-500 font-mono">{{ project.techStack.split(',')[0] }}</span>
            </div>

            <div class="flex items-center gap-3 text-xs text-gray-400">
              <span v-if="project.stars !== undefined"
                class="flex items-center gap-1 group-hover:text-yellow-500 transition-colors">
                <UIcon name="i-heroicons-star-20-solid" class="w-3 h-3" /> {{ project.stars }}
              </span>
              <span v-if="project.forks !== undefined" class="flex items-center gap-1">
                <UIcon name="i-heroicons-code-bracket-20-solid" class="w-3 h-3" /> {{ project.forks }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes beam {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}

.animate-beam {
  animation: beam 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.perspective-1000 {
  perspective: 1000px;
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
