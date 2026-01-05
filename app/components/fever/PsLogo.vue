<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  width?: string | number
  height?: string | number
  value?: string
}>(), {
  value: 'XXx.Y'
})

const STRIDE = 70
const SCALE = 0.8

const items = computed(() => {
  return (props.value || '').split('').map((char, index) => {
    const x = index * STRIDE
    let type = ''
    let filled = false

    if (char.toLowerCase() === 'x') {
      type = 'x'
      filled = char === 'X'
    } else if (char.toLowerCase() === 'y') {
      type = 'y'
      filled = char === 'Y'
    } else if (char === '.') {
      type = 'dot'
      filled = true
    }

    return {
      type,
      filled,
      x
    }
  })
})

const viewBoxWidth = computed(() => {
  const count = items.value.length
  return Math.ceil((count * STRIDE + 10) * SCALE)
})
</script>

<template>
  <svg :width="width" :height="height" :class="[!width && !height ? 'w-full h-full' : '']"
    :viewBox="`0 0 ${viewBoxWidth} 70`" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0, 0) scale(0.8)">
      <g v-for="(item, i) in items" :key="i" :transform="`translate(${item.x}, 0)`">
        <!-- X Shape -->
        <path v-if="item.type === 'x'"
          d="M10 10 L25 10 L40 35 L55 10 L70 10 L50 45 L70 80 L55 80 L40 55 L25 80 L10 80 L30 45 Z"
          :fill="item.filled ? 'currentColor' : 'none'" :stroke="!item.filled ? 'currentColor' : 'none'"
          :stroke-width="!item.filled ? 4 : 0" />

        <!-- Y Shape -->
        <path v-if="item.type === 'y'" d="M10 10 L25 10 L40 35 L55 10 L70 10 L45 50 L45 80 L35 80 L35 50 Z"
          :fill="item.filled ? 'currentColor' : 'none'" :stroke="!item.filled ? 'currentColor' : 'none'"
          :stroke-width="!item.filled ? 4 : 0" />

        <!-- Dot (Diamond) -->
        <rect v-if="item.type === 'dot'" x="36" y="41" width="8" height="8" transform="rotate(45 40 45)"
          fill="currentColor" />
      </g>
    </g>
  </svg>
</template>
