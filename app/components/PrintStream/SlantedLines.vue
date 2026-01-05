<template>
  <svg viewBox="0 0 100 100" style="overflow: visible;">
    <line v-for="i in count" :key="i" :x1="getX(i)" :y1="50 - height / 2" :x2="getX(i)" :y2="50 + height / 2"
      :stroke="stroke" :stroke-width="strokeWidth" stroke-linecap="round"
      :transform="`rotate(${angle}, ${getX(i)}, 50)`" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  // 线条数量
  count: {
    type: Number,
    default: 4
  },
  // 线条间距
  gap: {
    type: Number,
    default: 20
  },
  // 线条长度
  height: {
    type: Number,
    default: 70
  },
  // 旋转角度
  angle: {
    type: Number,
    default: 45
  },
  stroke: {
    type: String,
    default: '#000000'
  },
  strokeWidth: {
    type: Number,
    default: 8
  }
})

const totalWidth = computed(() => (props.count - 1) * props.gap);
const startX = computed(() => (100 - totalWidth.value) / 2);

const getX = (i: number) => startX.value + (i - 1) * props.gap;
</script>
