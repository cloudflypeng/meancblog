<template>
  <svg :viewBox="`0 0 ${totalSize} ${totalSize}`" :style="{ transform: `rotate(${rotation}deg)` }">
    <!-- 左上 -->
    <rect :x="0" :y="0" :width="size" :height="size" :fill="fill" />
    <!-- 右上 -->
    <rect :x="size + gap" :y="0" :width="size" :height="size" :fill="fill" />
    <!-- 左下 -->
    <rect :x="0" :y="size + gap" :width="size" :height="size" :fill="fill" />
    <!-- 右下 -->
    <rect :x="size + gap" :y="size + gap" :width="size" :height="size" :fill="fill" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  // 小方块的大小
  size: {
    type: Number,
    default: 40
  },
  // 方块间距
  gap: {
    type: Number,
    default: 10
  },
  // 填充颜色
  fill: {
    type: String,
    default: 'black'
  },
  // 旋转角度
  rotation: {
    type: Number,
    default: 90
  }
})

const totalSize = computed(() => props.size * 2 + props.gap);
</script>
