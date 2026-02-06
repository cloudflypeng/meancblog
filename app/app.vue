<template>
  <UApp>
    <OverlayScrollbarsComponent ref="scrollRef" id="scroll-wrapper" defer class="h-screen w-full"
      @os-initialized="onOsInitialized"
      :options="{ scrollbars: { autoHide: 'move', clickScroll: true } }">
      <PartBg />
      <!-- 页面加载进度条 -->
      <PageProgress />

      <!-- 导航栏 -->
      <PartHeader />

      <!-- 主内容区 -->
      <NuxtPage />
      <Footer />
    </OverlayScrollbarsComponent>
  </UApp>
</template>
<script setup lang="ts">
import type { OverlayScrollbars } from 'overlayscrollbars'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { nextTick, onMounted, ref } from 'vue'
import PartHeader from '~/part/Header.vue'
import PartBg from '~/part/Bg.vue'
import Footer from '~/part/Footer.vue'

const router = useRouter()
const scrollRef = ref<InstanceType<typeof OverlayScrollbarsComponent> | null>(null)
const osInstance = ref<OverlayScrollbars | null>(null)

const onOsInitialized = (instance: OverlayScrollbars) => {
  osInstance.value = instance
}

const getScrollElement = () => {
  const instance = osInstance.value ?? scrollRef.value?.osInstance()
  const scrollEl = instance?.elements().scrollOffsetElement
  if (scrollEl) return scrollEl

  const host = scrollRef.value?.getElement()
  if (!host) return null
  return host.querySelector<HTMLElement>('.os-viewport') ?? host
}

const scrollToTop = () => {
  const scrollEl = getScrollElement()
  if (!scrollEl) return
  scrollEl.scrollTop = 0
  scrollEl.scrollLeft = 0
}

onMounted(() => {
  router.afterEach(() => {
    nextTick(() => {
      scrollToTop()
    })
  })
})
</script>
<style>
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.outline-text {
  color: white;
  /* 字体颜色 */
  -webkit-text-stroke: 2px black;
  /* 描边粗细和颜色 */
}
</style>
