<script setup lang="ts" vapor>
import { ref, onMounted, onUnmounted } from 'vue'
import PsLogo from './fever/PsLogo.vue'
import PsStripes from './fever/PsStripes.vue'
import PsDiagonal from './fever/PsDiagonal.vue'

const experience = [
  {
    id: 'data-saas',
    title: 'Data Analysis SaaS Platform',
    role: 'Frontend Developer',
    year: '2020',
    content: [
      'tech stack: react, redux, antd, antv, echarts, fetch',
      'Analyze group data collection SDK data, provide real-time analysis, daily active user trends, carrier analysis, user geographic analysis and other fixed report functions',
    ]
  }, {
    id: 'data-gov',
    title: 'Data Governance Software',
    role: 'Full Stack',
    year: '2022',
    content: [
      'tech stack: react, redux, antd, antv, echarts, fetch',
      'Data collection, storage, management, application, analysis'
    ]
  }, {
    id: 'data-vis',
    title: 'Data Visualization Dashboard',
    role: 'Frontend Lead',
    year: '2023',
    content: [
      'tech stack: vue, pinia, echarts, fetch',
      'Visual analysis, Chart linkage, Drill-down, Custom chart configuration, Custom data display'
    ]
  },
  {
    id: 'exam-platform',
    title: 'Online Exam Platform',
    role: 'Core Developer',
    year: '2025',
    content: [
      'tech stack: vue, pinia, echarts, fetch',
      'Anti-cheating system, Paper distribution system'
    ]
  }, {
    id: 'ai-recruit',
    title: 'AI Recruitment Platform',
    role: 'System Architect',
    year: '2025',
    content: [
      'tech stack: vue, pinia, echarts, fetch',
      'Anti-cheating system, Device detection system, Multi-terminal anti-cheating, Answer system, Paper system, Exam system, Exam management system, Exam monitoring system, Exam statistics system, Exam analysis system, Exam report system'
    ]
  }, {
    id: 'eno-music',
    title: 'eno-music',
    role: 'Indie Developer',
    year: '2024',
    link: 'https://chromewebstore.google.com/detail/eno-m/hjcdffalgapcchmopkbnkljenlglloln?hl=zh-CN&utm_source=ext_sidebar',
    content: [
      'tech stack: vue, pinia',
      'A music player that can play music from the bilibili'
    ]
  }, {
    id: 'eno-m-desktop',
    title: 'eno-m-desktop',
    role: 'Indie Developer',
    year: '2025',
    link: 'https://github.com/Cteros/eno-m-desktop',
    content: [
      'tech stack: vue, electron',
      'A music player that can play music from the bilibili, desktop version'
    ]
  },
  {
    id: 'otter',
    title: 'Otter - clash TUI',
    role: 'Indie Developer',
    year: '2025',
    link: 'https://github.com/cloudflypeng/otter',
    content: [
      'tech stack: bun, ts, ink, clash core',
      'A terminal user interface (TUI) for clash, providing a more user-friendly way to manage and monitor clash.'
    ]
  }
]

const activeIndex = ref(0)
const itemRefs = ref<HTMLElement[]>([])

// 生成随机旋转角度，保持确定性
const rotations: number[] = experience.map(() => (Math.random() * 10 - 5))

const getCardStyle = (index: number) => {
  const isActive = index === activeIndex.value
  const isPast = index < activeIndex.value

  if (isPast) {
    return {
      opacity: 0,
      transform: 'translateY(-120%) rotate(-15deg) scale(0.8)',
      zIndex: 0,
      pointerEvents: 'none' as const,
      transition: 'all 0.6s cubic-bezier(0.5, 0, 0.2, 1)'
    }
  }

  if (isActive) {
    return {
      opacity: 1,
      transform: 'translateY(0) scale(1) rotate(0deg)',
      zIndex: 50,
      filter: 'none',
      transition: 'all 0.6s cubic-bezier(0.2, 1, 0.3, 1)'
    }
  }

  // Future cards (stack at bottom)
  return {
    opacity: 1,
    transform: `translate(${(rotations[index] || 0) * 2}px, ${(rotations[index] || 0) * 2}px) rotate(${rotations[index] || 0}deg) scale(0.95)`,
    zIndex: 40 - index,
    filter: 'grayscale(100%) contrast(0.9) brightness(1.1)',
    transition: 'all 0.6s cubic-bezier(0.2, 1, 0.3, 1)'
  }
}

const openLink = (link: string | undefined) => {
  if (!link) return
  window.open(link)
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Number(entry.target.getAttribute('data-index'))
        if (!isNaN(index)) {
          activeIndex.value = index
        }
      }
    })
  }, {
    rootMargin: '-40% 0px -40% 0px', // 视口中间 20% 区域触发
    threshold: 0
  })

  itemRefs.value.forEach(el => {
    if (el) observer?.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div
    class="flex flex-col md:flex-row relative w-full min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white">
    <!-- Background Elements -->
    <div class="fixed inset-0 pointer-events-none z-0 opacity-5">
      <div class="absolute top-0 left-0 w-full h-full"
        style="background-image: radial-gradient(currentColor 1px, transparent 1px); background-size: 20px 20px;"></div>
    </div>

    <!-- Left Sticky Panel -->
    <div class="hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center overflow-hidden">
      <div class="absolute top-10 left-10 z-0 opacity-20 transform -rotate-12">
        <PsLogo value="EXPERIENCE" width="400" />
      </div>

      <div class="relative w-full max-w-[500px] h-[400px] perspective-1000">
        <div v-for="(item, index) in experience" :key="item.id"
          class="absolute top-0 left-0 w-full h-full origin-center" :style="getCardStyle(index)">
          <div
            class="bg-white dark:bg-gray-800 border-4 border-black dark:border-white p-1 relative overflow-hidden h-full shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,1)]">
            <!-- Decorative Corner -->
            <div
              class="absolute top-0 right-0 w-16 h-16 bg-black dark:bg-white transform translate-x-8 -translate-y-8 rotate-45 z-20">
            </div>

            <!-- Content -->
            <div
              class="relative z-10 h-full flex flex-col border-2 border-black dark:border-white border-dashed p-6 bg-gray-50 dark:bg-gray-900">
              <!-- Header -->
              <div class="flex justify-between items-start mb-4 border-b-4 border-black dark:border-white pb-2">
                <span
                  class="font-mono text-sm font-bold bg-black dark:bg-white text-white dark:text-black px-2 py-1 transform -skew-x-12">
                  NO.0{{ experience.length - index }}
                </span>
                <div class="w-8 h-8 text-black dark:text-white opacity-50">
                  <PsDiagonal />
                </div>
              </div>

              <!-- Title Area -->
              <div class="flex-1 flex flex-col justify-center relative">
                <h3 class="text-4xl font-black italic leading-none mb-2 uppercase transform -rotate-1"
                  style="font-family: 'Impact', sans-serif;">
                  {{ item.title }}
                </h3>
                <span
                  class="text-sm font-bold bg-primary text-white px-2 py-0.5 self-start transform skew-x-12 shadow-sm">
                  {{ item.role }}
                </span>

                <!-- Year Watermark -->
                <span
                  class="absolute right-0 bottom-0 text-8xl font-black opacity-10 transform rotate-12 pointer-events-none select-none text-black dark:text-white"
                  style="font-family: 'Impact', sans-serif;">
                  {{ item.year }}
                </span>
              </div>

              <!-- Footer -->
              <div class="mt-auto pt-4 border-t-2 border-black dark:border-white flex justify-between items-end">
                <div class="w-full h-4 opacity-20">
                  <PsStripes />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Scrollable List -->
    <div class="w-full md:w-1/2 flex flex-col relative z-10">
      <div v-for="(item, index) in experience" :key="item.id"
        class="min-h-[80vh] flex flex-col justify-center p-8 md:p-16 relative border-b border-dashed border-black/10 dark:border-white/10 last:border-0"
        :class="{ 'is-active': activeIndex === index }" ref="itemRefs" :data-index="index">

        <!-- Item Background Decoration -->
        <div
          class="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-32 bg-black dark:bg-white transform transition-all duration-300"
          :class="activeIndex === index ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'"></div>

        <div class="relative transition-all duration-500"
          :class="activeIndex === index ? 'translate-x-4 opacity-100' : 'opacity-30 grayscale'">

          <div class="flex items-baseline gap-4 mb-2">
            <span
              class="text-6xl font-black italic text-stroke-1 text-transparent md:text-black/10 dark:md:text-white/10"
              :class="activeIndex === index ? 'text-primary md:text-primary' : ''">
              {{ item.year }}
            </span>
            <span
              class="text-sm font-mono font-bold bg-black dark:bg-white text-white dark:text-black px-2 py-1 transform -skew-x-12"
              v-if="activeIndex === index">
              TARGET ACQUIRED
            </span>
          </div>

          <h4 @click="openLink(item.link)"
            class="text-3xl md:text-5xl font-black uppercase mb-6 leading-tight cursor-pointer group flex items-center gap-4"
            :class="{ 'hover:text-primary transition-colors': !!item.link }">
            <span class="bg-white dark:bg-gray-950 relative z-10 px-2 box-decoration-clone">{{ item.title }}</span>
            <svg v-if="item.link"
              class="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </h4>

          <div
            class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-l-4 border-black dark:border-white p-6 shadow-lg transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div class="mb-4">
              <span
                class="font-black text-sm uppercase tracking-widest border-b-2 border-black dark:border-white pb-1 mb-2 inline-block">Role</span>
              <p class="font-mono text-lg">{{ item.role }}</p>
            </div>

            <div class="space-y-4">
              <div v-for="(content, cIndex) in item.content" :key="cIndex">
                <div v-if="cIndex === 0" class="mb-2">
                  <span
                    class="font-black text-xs uppercase bg-black dark:bg-white text-white dark:text-black px-1 mr-2">TECH</span>
                  <span class="font-mono text-sm text-primary font-bold">{{ content.replace('tech stack: ', '')
                    }}</span>
                </div>
                <p v-else
                  class="font-mono text-sm md:text-base leading-relaxed opacity-80 border-l-2 border-gray-300 dark:border-gray-600 pl-4">
                  {{ content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-stroke-1 {
  -webkit-text-stroke: 1px currentColor;
}

.perspective-1000 {
  perspective: 1000px;
}
</style>
