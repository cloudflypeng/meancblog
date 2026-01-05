<script setup lang="ts" vapor>
import { computed } from 'vue'
import techStackData from '../data/techStack.json'
import PsLogo from './fever/PsLogo.vue'

interface TechItem {
  name: string
  color: string
  logo: string
  logoColor: string
  pattern?: string
}

const generatePattern = () => {
  const chars = ['x', 'X', 'Y', 'y', '.']
  return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

const techs = computed(() => {
  const list: TechItem[] = []
  Object.values(techStackData).forEach((category: any) => {
    list.push(...category)
  })

  // 去重
  return list.filter((item, index, self) =>
    index === self.findIndex((t) => t.name === item.name)
  ).map(item => ({
    ...item,
    pattern: generatePattern()
  }))
})
</script>

<template>
  <div class="w-full py-20 bg-white dark:bg-[#1a1a1a] text-black dark:text-white font-sans overflow-hidden relative">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5 pointer-events-none"
      style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 20px 20px;">
    </div>

    <div class="max-w-7xl mx-auto px-4 relative z-10">
      <!-- 标题区域 -->
      <div class="flex flex-col md:flex-row items-start md:items-end gap-6 mb-20 relative">
        <!-- Decorative Star -->
        <div class="absolute -top-10 -left-10 text-black opacity-10 transform rotate-12">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>

        <div class="relative">
          <h2
            class="my-4 pr-10 text-7xl md:text-9xl font-black uppercase tracking-tighter italic transform -rotate-2 text-stroke-2 text-transparent bg-clip-text bg-black dark:bg-white"
            style="font-family: 'Impact', sans-serif; -webkit-text-stroke: 2px currentColor;">
            ARSENAL
          </h2>
          <div
            class="absolute -bottom-4 -right-4 bg-[#d9333f] text-white px-4 py-1 transform skew-x-12 rotate-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <span class="text-xl font-bold tracking-widest font-mono">TECH STACK</span>
          </div>
        </div>

        <div class="flex-1 border-b-4 border-black dark:border-white mb-4 ml-8 hidden md:block relative">
          <div class="absolute right-0 bottom-2 flex gap-1">
            <div class="w-2 h-2 bg-black dark:bg-white"></div>
            <div class="w-2 h-2 bg-black dark:bg-white"></div>
            <div class="w-2 h-2 bg-black dark:bg-white"></div>
          </div>
        </div>

        <div class="w-24 h-24 opacity-80 select-none text-black dark:text-white hidden md:block">
          <PsLogo value="SKILLS" />
        </div>
      </div>

      <!-- 列表区域 -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 px-4">
        <div v-for="(tech, index) in techs" :key="tech.name" class="group relative cursor-pointer"
          style="perspective: 1000px;">

          <!-- Card Container -->
          <div class="relative transform transition-all duration-300 group-hover:-translate-y-2 group-hover:-rotate-2">

            <!-- Shadow Block -->
            <div
              class="absolute inset-0 bg-black transform translate-x-2 translate-y-2 skew-x-[-10deg] transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4">
            </div>

            <!-- Main Card -->
            <div
              class="relative bg-white border-2 border-black h-32 transform skew-x-[-10deg] overflow-hidden transition-colors duration-300 group-hover:bg-black group-hover:border-white">

              <!-- Background Decoration -->
              <div class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <!-- <PsStripes /> -->
                <PsLogo :value="tech.pattern" />
              </div>

              <!-- Content (Un-skewed visually if needed, but let's keep it skewed for style) -->
              <div class="h-full flex flex-col justify-between p-4 relative z-10">

                <!-- Top Row -->
                <div class="flex justify-between items-start">
                  <span
                    class="font-mono text-xs font-bold bg-black text-white px-1.5 py-0.5 group-hover:bg-white group-hover:text-black transition-colors">
                    NO.{{ String(index + 1).padStart(2, '0') }}
                  </span>
                  <div class="w-2 h-2 bg-black rounded-full group-hover:bg-[#d9333f] transition-colors"></div>
                </div>

                <!-- Tech Name -->
                <div class="flex items-end justify-between transform -translate-y-3">
                  <span
                    class="text-2xl md:text-3xl font-black italic uppercase leading-none group-hover:text-white transition-colors"
                    style="font-family: 'Impact', sans-serif;">
                    {{ tech.name }}
                  </span>
                </div>

                <!-- Hover Reveal Icon -->
                <div
                  class="absolute -right-4 -bottom-4 text-[#d9333f] opacity-0 transform translate-y-4 rotate-12 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-stroke-2 {
  -webkit-text-stroke: 2px currentColor;
}
</style>
