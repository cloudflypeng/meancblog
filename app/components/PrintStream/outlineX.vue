<template>
  <svg viewBox="0 0 100 100" style="overflow: visible;">
    <path :d="path" :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" />
  </svg>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  thickness: {
    type: Number,
    default: 20
  },
  stroke: {
    type: String,
    default: '#000000'
  },
  strokeWidth: {
    type: Number,
    default: 1
  },
  fill: {
    type: String,
    default: 'none'
  }
})

const path = computed(() => {
  const w = props.thickness;
  return `
    M 0 0 
    L ${w} 0 
    L 50 ${50 - w} 
    L ${100 - w} 0 
    L 100 0 
    L 100 ${w} 
    L ${50 + w} 50 
    L 100 ${100 - w} 
    L 100 100 
    L ${100 - w} 100 
    L 50 ${50 + w} 
    L ${w} 100 
    L 0 100 
    L 0 ${100 - w} 
    L ${50 - w} 50 
    L 0 ${w} 
    Z
  `
})
</script>
