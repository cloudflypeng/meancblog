<template>
  <div class="min-h-screen py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- 公司项目 -->
    <section class="mb-20">
      <div class="flex items-center gap-3 mb-8">
        <div
          class="p-2.5 rounded-xl text-blue-600 dark:text-blue-400 ring-1 ring-blue-100 dark:ring-blue-500/20 flex items-center justify-center">
          <UIcon name="i-heroicons-briefcase-20-solid" class="w-6 h-6" />
        </div>
        <div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">商业项目</h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">企业级解决方案与商业化产品</p>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div v-for="project in companyProjects" :key="project.name"
          class="group relative rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 cursor-pointer overflow-hidden"
          @click="goTo(project.url)">

          <div
            class="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
            <UIcon name="i-heroicons-arrow-up-right-20-solid" class="w-5 h-5 text-blue-500" />
          </div>

          <div class="mb-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <UIcon v-if="project.url" name="i-mdi-web" class="w-5 h-5 text-blue-400 mr-1" />
                {{ project.name }}
              </h3>
              <span v-if="project.year"
                class="text-xs font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {{ project.year }}
              </span>
            </div>

            <div v-if="project.role" class="mb-3 text-xs font-medium text-blue-600 dark:text-blue-400">
              <UIcon name="i-heroicons-user-20-solid" class="inline w-4 h-4 mr-1" />
              {{ project.role }}
            </div>

            <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
              {{ project.description }}
            </p>

            <div v-if="project.techStack" class="flex flex-wrap gap-2 mt-2">
              <span v-for="tech in project.techStack.split(',')" :key="tech"
                class="px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-200 bg-blue-50 dark:bg-blue-900/40 rounded border border-blue-100 dark:border-blue-700">
                <UIcon v-if="tech.trim().toLowerCase() === 'vue'" name="i-simple-icons-vue-dot-js"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'react'" name="i-simple-icons-react"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'electron'" name="i-simple-icons-electron"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'pinia'" name="i-simple-icons-pinia"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'redux'" name="i-simple-icons-redux"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'antv'" name="i-simple-icons-antdesign"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'echarts'" name="i-simple-icons-apacheecharts"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'antd'" name="i-simple-icons-antdesign"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'ts'" name="i-simple-icons-typescript"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'bun'" name="i-simple-icons-bun"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'ink'" name="i-simple-icons-ink"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                {{ tech.trim() }}
              </span>
            </div>
          </div>

          <div
            class="flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0">
            <span>查看详情</span>
            <UIcon name="i-heroicons-arrow-up-right-20-solid" class="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
    </section>

    <!-- 开源项目 -->
    <section>
      <div class="flex items-center gap-3 mb-8">
        <div
          class="p-2.5 rounded-xl text-green-600 dark:text-green-400 ring-1 ring-green-100 dark:ring-green-500/20 flex items-center justify-center">
          <UIcon name="i-heroicons-code-bracket-square-20-solid" class="w-6 h-6" />
        </div>
        <div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">开源贡献</h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">社区项目与技术探索</p>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div v-for="project in opensourceProjects" :key="project.name"
          class="group relative rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-800 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5 hover:-translate-y-1 cursor-pointer overflow-hidden"
          @click="goTo(project.url)">

          <div
            class="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
            <UIcon name="i-heroicons-arrow-up-right-20-solid" class="w-5 h-5 text-green-500" />
          </div>

          <div class="mb-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <UIcon v-if="project.url" name="i-mdi-github" class="w-5 h-5 text-green-400 mr-1" />
                {{ project.name }}
              </h3>
              <span v-if="project.year"
                class="text-xs font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {{ project.year }}
              </span>
            </div>

            <div v-if="project.role" class="mb-3 text-xs font-medium text-green-600 dark:text-green-400">
              <UIcon name="i-heroicons-user-20-solid" class="inline w-4 h-4 mr-1" />
              {{ project.role }}
            </div>

            <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
              {{ project.description }}
            </p>

            <div v-if="project.techStack" class="flex flex-wrap gap-2 mt-2">
              <span v-for="tech in project.techStack.split(',')" :key="tech"
                class="px-2 py-1 text-xs font-medium text-green-700 dark:text-green-200 bg-green-50 dark:bg-green-900/40 rounded border border-green-100 dark:border-green-700">
                <UIcon v-if="tech.trim().toLowerCase() === 'vue'" name="i-simple-icons-vue-dot-js"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'react'" name="i-simple-icons-react"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'electron'" name="i-simple-icons-electron"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'pinia'" name="i-simple-icons-pinia"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'redux'" name="i-simple-icons-redux"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'antv'" name="i-simple-icons-antdesign"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'echarts'" name="i-simple-icons-apacheecharts"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'antd'" name="i-simple-icons-antdesign"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'ts'" name="i-simple-icons-typescript"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'bun'" name="i-simple-icons-bun"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                <UIcon v-else-if="tech.trim().toLowerCase() === 'ink'" name="i-simple-icons-ink"
                  class="inline w-4 h-4 mr-1 align-text-bottom" />
                {{ tech.trim() }}
              </span>
            </div>

            <!-- GitHub Stats -->
            <div v-if="project.stars !== undefined || project.forks !== undefined"
              class="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
              <div v-if="project.stars !== undefined" class="flex items-center gap-1">
                <UIcon name="i-heroicons-star-solid" class="w-4 h-4" />
                <span>{{ project.stars }}</span>
              </div>
              <div v-if="project.forks !== undefined" class="flex items-center gap-1">
                <UIcon name="i-heroicons-code-bracket-square" class="w-4 h-4" />
                <span>{{ project.forks }}</span>
              </div>
            </div>
          </div>

          <div
            class="flex items-center text-xs font-medium text-green-600 dark:text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0">
            <span>GitHub</span>
            <UIcon name="i-heroicons-arrow-up-right-20-solid" class="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

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

const companyProjects = (projects as Project[]).filter(p => p.type === 'company')

// 获取 GitHub pinned 项目
const { data: githubData } = await useFetch('/api/github-pinned')
const opensourceProjects = computed(() => {
  if (githubData.value?.projects && githubData.value.projects.length > 0) {
    return githubData.value.projects as Project[]
  }
  // 降级到静态数据
  return (projects as Project[]).filter(p => p.type === 'opensource')
})

function goTo(url: string) {
  if (!url) return
  window.open(url, '_blank')
}
</script>
