<script setup lang="ts" vapor>
import { onMounted, ref } from 'vue';
import { animate } from 'animejs';

const scrollText = ref<HTMLElement | null>(null);
const mouse = ref<HTMLElement | null>(null);
const mouseWheel = ref<HTMLElement | null>(null);

onMounted(() => {
  // Text animation - Enhanced effect with multiple properties
  if (scrollText.value) {
    animate(scrollText.value, {
      opacity: [0.3, 1, 0.3],
      scale: [0.9, 1.1, 0.9],
      translateY: [2, -2, 2],
      duration: 2000,
      loop: true,
      easing: 'easeInOutSine'
    });
  }

  // Mouse animation - Floating effect
  if (mouse.value) {
    animate(mouse.value, {
      translateY: [-4, 4],
      duration: 2000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });
  }

  // Wheel animation - Scroll down and fade
  if (mouseWheel.value) {
    animate(mouseWheel.value, {
      translateY: [0, 7],
      opacity: [1, 0],
      scaleY: [1, 0.8],
      duration: 2000,
      loop: true,
      easing: 'easeOutQuad'
    });
  }
});
</script>

<template>
  <div class="scroll-indicator-wrapper">
    <span ref="scrollText" class="scroll-text">SCROLL</span>
    <div ref="mouse" class="mouse">
      <div ref="mouseWheel" class="mouse-wheel"></div>
    </div>

  </div>
</template>

<style scoped>
.scroll-indicator-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.5;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.scroll-indicator-wrapper:hover {
  opacity: 1;
}

.scroll-text {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--primary-color);
}

.mouse {
  width: 24px;
  height: 36px;
  border: 2px solid currentColor;
  border-radius: 12px;
  position: relative;
}

.mouse-wheel {
  --width: 3px;
  width: var(--width);
  height: 8px;
  background-color: currentColor;
  border-radius: 2px;
  position: absolute;
  /* top: 50%; */
  left: calc(50% - var(--width) / 2);
  /* transform: translate(-50%, -50%); */
}
</style>
