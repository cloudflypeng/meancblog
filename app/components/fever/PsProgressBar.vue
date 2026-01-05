<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  progress?: number
  label?: string
  width?: string
}>(), {
  progress: 0,
  label: "TODAY'S PROGRESS",
  width: '100%'
})

const displayProgress = computed(() => Math.min(100, Math.max(0, props.progress)))
</script>

<template>
  <div class="ps-progress-wrapper" :style="{ width }">
    <!-- Label Section -->
    <div class="flex items-end gap-2 mb-1 ml-1">
      <div
        class="bg-black text-white px-2 py-0.5 text-xs font-bold transform -skew-x-12 shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
        <span class="block transform skew-x-12 tracking-wider">{{ label }}</span>
      </div>
      <div class="text-black font-black text-xl leading-none italic" style="font-family: 'Impact', sans-serif;">
        {{ Math.round(displayProgress) }}%
      </div>
    </div>

    <!-- Bar Section -->
    <div
      class="relative h-5 w-full transform -skew-x-12 border-2 border-black bg-white p-[2px] shadow-[4px_4px_0px_rgba(0,0,0,1)]">
      <!-- Background Dots -->
      <div class="absolute inset-0 opacity-20 pointer-events-none"
        style="background-image: radial-gradient(circle, #000 1px, transparent 1px); background-size: 4px 4px;">
      </div>

      <!-- Progress Fill -->
      <div class="h-full bg-[#d9333f] relative transition-all duration-1000 ease-out overflow-hidden"
        :style="{ width: `${displayProgress}%` }">
        <!-- Stripes overlay -->
        <div class="absolute inset-0 w-full h-full"
          style="background: repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.15) 4px, rgba(0,0,0,0.15) 8px);">
        </div>

        <!-- Glare effect -->
        <div class="absolute top-0 left-0 w-full h-[2px] bg-white opacity-30"></div>
      </div>

      <!-- Star Decoration at the end of the bar -->
      <div class="absolute -right-2 -top-3 text-black transform skew-x-12 z-10 drop-shadow-md">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#facc15" stroke="black" stroke-width="2">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ps-progress-wrapper {
  display: inline-block;
}
</style>
