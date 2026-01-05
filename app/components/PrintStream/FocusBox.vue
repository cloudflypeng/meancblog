<template>
  <svg viewBox="0 0 100 100" style="overflow: visible;">
    <path :d="path" fill="none" :stroke="stroke" :stroke-width="strokeWidth" stroke-linecap="square"
      stroke-linejoin="miter" />
  </svg>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  // 角落折线的长度
  cornerLength: {
    type: Number,
    default: 25
  },
  // 中间十字的大小
  crossSize: {
    type: Number,
    default: 20
  },
  stroke: {
    type: String,
    default: '#000000'
  },
  strokeWidth: {
    type: Number,
    default: 5
  }
})

const path = computed(() => {
  const cl = props.cornerLength;
  const cs = props.crossSize / 2;

  return `
    M 0 ${cl} L 0 0 L ${cl} 0
    M ${100 - cl} 0 L 100 0 L 100 ${cl}
    M 100 ${100 - cl} L 100 100 L ${100 - cl} 100
    M ${cl} 100 L 0 100 L 0 ${100 - cl}
    M ${50 - cs} 50 L ${50 + cs} 50
    M 50 ${50 - cs} L 50 ${50 + cs}
  `
})
</script>
