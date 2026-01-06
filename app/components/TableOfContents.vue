<template>
  <nav v-if="toc && toc.links && toc.links.length" class="hidden xl:block fixed top-32 right-8 w-64 p-4 text-sm z-10">
    <div class="relative" ref="navContentRef">
      <!-- 移动的指示线 -->
      <div
        class="absolute left-0 w-[2px] bg-primary rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        :style="{
          top: `${indicatorStyle.top}px`,
          height: `${indicatorStyle.height}px`,
          opacity: indicatorStyle.opacity
        }"></div>

      <ul class="space-y-1">
        <li v-for="link in toc.links" :key="link.id">
          <a :href="`#${link.id}`" :ref="el => setLinkRef(link.id, el)"
            class="block pl-4 py-1.5 transition-all duration-300 ease-in-out text-left" :class="activeId === link.id
              ? 'text-gray-900 dark:text-white font-bold translate-x-2'
              : 'text-gray-500 dark:text-gray-400 opacity-70 hover:opacity-100 hover:translate-x-1'"
            @click.prevent="scrollToHeading(link.id)">
            {{ link.text }}
          </a>
          <!-- 二级目录 -->
          <ul v-if="link.children && link.children.length" class="mt-1 space-y-1">
            <li v-for="child in link.children" :key="child.id">
              <a :href="`#${child.id}`" :ref="el => setLinkRef(child.id, el)"
                class="block pl-8 py-1.5 transition-all duration-300 ease-in-out text-left" :class="activeId === child.id
                  ? 'text-gray-900 dark:text-white font-bold translate-x-2'
                  : 'text-gray-500 dark:text-gray-400 opacity-70 hover:opacity-100 hover:translate-x-1'"
                @click.prevent="scrollToHeading(child.id)">
                {{ child.text }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, watch, nextTick } from 'vue'

const props = defineProps<{
  toc: any
}>()

const activeId = ref<string>('')
const navContentRef = ref<HTMLElement | null>(null)
const linkRefs = ref<Record<string, HTMLElement>>({})
const isClickScrolling = ref(false)
let scrollTimeout: any = null

const indicatorStyle = reactive({
  top: 0,
  height: 0,
  opacity: 0
})

const setLinkRef = (id: string, el: any) => {
  if (el) {
    linkRefs.value[id] = el
  }
}

const updateIndicator = () => {
  if (!activeId.value || !linkRefs.value[activeId.value] || !navContentRef.value) {
    indicatorStyle.opacity = 0
    return
  }

  const el = linkRefs.value[activeId.value]

  // 简单的相对定位计算
  // @ts-ignore
  indicatorStyle.top = el.offsetTop
  // @ts-ignore
  indicatorStyle.height = el.offsetHeight
  indicatorStyle.opacity = 1
}

watch(activeId, () => {
  // 使用 nextTick 确保 DOM 更新后计算位置
  nextTick(() => {
    updateIndicator()
  })
})

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  const scrollWrapper = document.querySelector('#scroll-wrapper [data-overlayscrollbars-viewport]') || document.querySelector('#scroll-wrapper .os-viewport') || document.getElementById('scroll-wrapper')

  if (element && scrollWrapper) {
    // 标记为正在通过点击滚动，暂停 Observer 更新
    isClickScrolling.value = true
    if (scrollTimeout) clearTimeout(scrollTimeout)

    // 1秒后恢复监听（平滑滚动的持续时间）
    scrollTimeout = setTimeout(() => {
      isClickScrolling.value = false
    }, 1000)

    const offset = 100 // 顶部偏移量

    const elementRectTop = element.getBoundingClientRect().top
    const wrapperRectTop = scrollWrapper.getBoundingClientRect().top
    const currentScrollTop = scrollWrapper.scrollTop

    // Calculate target position
    // We need element to be at 'offset' from wrapper top
    // Current distance is (elementRectTop - wrapperRectTop)
    // Delta needed: (elementRectTop - wrapperRectTop) - offset

    const targetScrollTop = currentScrollTop + (elementRectTop - wrapperRectTop) - offset

    scrollWrapper.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    })

    activeId.value = id
  }
}

// Intersection Observer 用于监听滚动位置
let observer: IntersectionObserver | null = null

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '-100px 0px -80% 0px', // 视口顶部 100px 到 底部 80% 的区域触发
    threshold: 0
  }

  observer = new IntersectionObserver((entries) => {
    // 如果是点击触发的滚动，忽略观察者的更新
    if (isClickScrolling.value) return

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeId.value = entry.target.id
      }
    })
  }, options)

  // 观察所有的标题元素
  document.querySelectorAll('h2, h3').forEach((heading) => {
    if (heading.id) {
      observer?.observe(heading)
    }
  })

  // 初始化指示器位置
  setTimeout(() => {
    // 如果没有滚动触发，默认选中第一个
    if (!activeId.value && props.toc?.links?.[0]?.id) {
      activeId.value = props.toc.links[0].id
    }
    updateIndicator()
  }, 200)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
