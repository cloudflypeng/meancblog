<script setup lang="ts" vapor>
import { ref } from 'vue'
import friendsData from '../data/friends.json'
import PsLogo from './fever/PsLogo.vue'
import PsStripes from './fever/PsStripes.vue'
import PsDiagonal from './fever/PsDiagonal.vue'

interface Friend {
  name: string
  avatar: string
  url: string
  desc?: string
  rotate: number
  pattern: string
}

const generatePattern = () => {
  const chars = ['x', 'X', 'Y', 'y', '.']
  return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

// Initialize with random rotation
const friends = ref<Friend[]>(friendsData.map(f => ({
  ...f,
  rotate: Math.random() * 6 - 3, // Random rotation between -3deg and 3deg
  pattern: generatePattern()
})))
</script>

<template>
  <div class="w-full relative py-32 overflow-hidden bg-white dark:bg-[#1a1a1a] text-black dark:text-white">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5 pointer-events-none"
      style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 20px 20px;">
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <!-- Header -->
      <div class="flex flex-col items-center mb-24 relative">
        <div class="relative">
          <h2
            class="text-7xl pr-10 my-3 md:text-9xl font-black uppercase tracking-tighter italic transform -rotate-2 text-stroke-2 text-transparent bg-clip-text bg-black dark:bg-white relative z-10"
            style="font-family: 'Impact', sans-serif; -webkit-text-stroke: 2px currentColor;">
            CONFIDANTS
          </h2>
          <!-- Background Splash -->
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-black opacity-10 transform rotate-3 skew-x-12 z-0">
          </div>

          <div
            class="absolute -bottom-6 -right-10 bg-[#d9333f] text-white px-6 py-2 transform skew-x-12 rotate-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] z-20">
            <span class="text-2xl font-bold tracking-widest font-mono">COOPERATION</span>
          </div>
        </div>

        <div class="mt-8 flex items-center gap-4 opacity-60">
          <div class="w-16 h-4">
            <PsStripes />
          </div>
          <span class="font-mono text-sm font-bold tracking-[0.2em]">ESTABLISH LINKS</span>
          <div class="w-16 h-4">
            <PsStripes />
          </div>
        </div>
      </div>

      <!-- Friends Grid -->
      <div class="flex flex-wrap justify-center gap-12 md:gap-16">
        <a v-for="(friend, index) in friends" :key="friend.name" :href="friend.url" target="_blank"
          rel="noopener noreferrer"
          class="group relative w-[280px] h-[360px] transition-all duration-300 hover:z-50 no-underline"
          :style="{ transform: `rotate(${friend.rotate}deg)` }">

          <!-- Card Container -->
          <div
            class="absolute inset-0 bg-white border-4 border-black p-2 shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-transform duration-300 group-hover:-translate-y-2 group-hover:-rotate-2 group-hover:shadow-[12px_12px_0px_rgba(0,0,0,1)]">

            <!-- Inner Border -->
            <div
              class="h-full w-full border-2 border-black border-dashed p-4 flex flex-col relative overflow-hidden bg-[#f5f5f5]">

              <!-- Background Pattern -->
              <div class="absolute -right-10 -top-10 w-40 h-40 opacity-10 transform rotate-45 pointer-events-none">
                <PsLogo :value="friend.pattern" />
              </div>

              <!-- Header -->
              <div class="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
                <span class="font-mono text-xs font-bold bg-black text-white px-1.5 py-0.5">
                  NO.{{ String(index + 1).padStart(2, '0') }}
                </span>
                <div class="w-4 h-4 text-black">
                  <PsDiagonal />
                </div>
              </div>

              <!-- Avatar -->
              <div
                class="relative w-full aspect-square mb-4 border-2 border-black overflow-hidden group-hover:border-[#d9333f] transition-colors">
                <img :src="friend.avatar" :alt="friend.name"
                  class="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500">

                <!-- Corner Decoration -->
                <div class="absolute bottom-0 right-0 w-8 h-8 bg-black transform translate-x-4 translate-y-4 rotate-45">
                </div>
              </div>

              <!-- Info -->
              <div class="mt-auto relative z-10">
                <h3
                  class="text-2xl font-black uppercase italic leading-none mb-1 transform -rotate-1 group-hover:text-[#d9333f] transition-colors"
                  style="font-family: 'Impact', sans-serif;">
                  {{ friend.name }}
                </h3>
                <p class="font-mono text-xs leading-tight opacity-70 line-clamp-2 border-l-2 border-black pl-2">
                  {{ friend.desc || 'A mysterious collaborator.' }}
                </p>
              </div>

              <!-- Hover Effect Overlay -->
              <div
                class="absolute inset-0 bg-[#d9333f] mix-blend-multiply opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
              </div>
            </div>
          </div>

          <!-- Pin/Tape Effect -->
          <div
            class="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#d9333f] rounded-full border-2 border-black shadow-sm z-20 flex items-center justify-center">
            <div class="w-2 h-2 bg-black rounded-full opacity-50"></div>
          </div>

        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-stroke-2 {
  -webkit-text-stroke: 2px currentColor;
}
</style>
