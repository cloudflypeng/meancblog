<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  text: string;
  imgSrc?: string;
}>();

// 生成唯一ID防止冲突
const uid = Math.random().toString(36).substr(2, 9);
const clipId = `blobClip-${uid}`;
const pathId = `orbitPath-${uid}`;

const repeatedText = computed(() => {
  return props.text
});

const blobPath = "M43.1,-68.5C56.2,-58.6,67.5,-47.3,72.3,-33.9C77.2,-20.5,75.5,-4.9,74.2,11.3C72.9,27.6,71.9,44.5,63.8,57.2C55.7,69.8,40.6,78.2,25.5,79.2C10.4,80.1,-4.7,73.6,-20.9,69.6C-37.1,65.5,-54.5,63.9,-66,54.8C-77.5,45.8,-83.2,29.3,-85.7,12.3C-88.3,-4.8,-87.7,-22.3,-79.6,-34.8C-71.5,-47.3,-55.8,-54.9,-41.3,-64.2C-26.7,-73.6,-13.4,-84.7,0.8,-86C15,-87.2,29.9,-78.5,43.1,-68.5Z";
</script>

<template>
  <ClientOnly>
    <section class="textover-dom">
      <div class="slot-wrapper">
        <slot />
      </div>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="orbit-svg" aria-hidden="true">
        <defs>
          <clipPath :id="clipId">
            <path :d="blobPath" transform="translate(100 100)" />
          </clipPath>
          <path :id="pathId" :d="blobPath" fill="none" stroke="none" transform="translate(100 100)" />
        </defs>
        <g transform="translate(100 100)">
          <path :d="blobPath" class="glow-bg" />
        </g>
        <image v-if="imgSrc" :href="imgSrc" width="200" height="200" preserveAspectRatio="xMidYMid slice"
          :clip-path="`url(#${clipId})`" class="orbit-image" />
        <text class="text-content">
          <textPath :href="`#${pathId}`" startOffset="0%">
            {{ repeatedText }}
            <animate attributeName="startOffset" from="0%" to="100%" dur="20s" repeatCount="indefinite" />
          </textPath>
          <textPath :href="`#${pathId}`" startOffset="100%">
            {{ repeatedText }}
            <animate attributeName="startOffset" from="-100%" to="0%" dur="20s" repeatCount="indefinite" />
          </textPath>
        </text>
      </svg>
    </section>
  </ClientOnly>
</template>

<style scoped>
.textover-dom {
  position: relative;
  width: min(300px, 70vw);
  height: min(300px, 70vw);
  display: grid;
  place-items: center;
  color: var(--textover-color, rgba(17, 24, 39, 0.75));
}

.slot-wrapper {
  position: relative;
  z-index: 2;
}

.orbit-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.text-content {
  opacity: 0.6;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  fill: currentColor;
  stroke: currentColor;
  stroke-width: 0.3;
  text-transform: uppercase;
  transition: all 0.3s ease;
  fill: var(--textover-hover-color, #000);
  stroke: var(--textover-hover-color, #000000);
}

.textover-dom:hover .text-content {
  fill: var(--textover-hover-color, #ffffff);
  stroke: var(--textover-hover-color, #ffffff);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.orbit-image {
  transform-origin: center;
  transform-box: fill-box;
  transition: transform 0.4s ease-out;
  transform: scale(0.96);
}

.textover-dom:hover .orbit-image {
  transform: scale(1.2);
}

.glow-bg {
  fill: var(--textover-glow-color, rgba(156, 163, 175, 0.4));
  filter: blur(12px);
  transform: scale(0.85);
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 0.4s ease-out, filter 0.3s ease, opacity 0.3s ease;
  pointer-events: none;
  opacity: 0.5;
}

.textover-dom:hover .glow-bg {
  transform: scale(0.92);
  filter: blur(16px);
  opacity: 0.8;
}

@media (prefers-color-scheme: dark) {
  .textover-dom {
    color: var(--textover-color-dark, rgba(255, 255, 255, 0.65));
  }
}
</style>
