<template>
  <div class="min-h-screen py-20">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 头部 -->
      <ContentHeader title="相册" description="一些乱七八糟的图片">
        <UButton icon="i-heroicons-arrow-path" variant="outline" size="sm" @click="reshuffle">换一批</UButton>
      </ContentHeader>

      <!-- 图片瀑布流 Masonry 布局 -->
      <div class="masonry gap-3">
        <div v-for="image in displayImages" :key="image.id"
          class="group relative overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 masonry-item"
          @click="openLightbox(image)" :style="{ aspectRatio: image.aspectRatio }">
          <!-- 图片容器 -->
          <img :src="image.url" :alt="image.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

          <!-- 覆盖层 -->
          <div
            class="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
            <h3 class="text-white font-semibold text-sm">{{ image.title }}</h3>
            <p class="text-gray-200 text-xs line-clamp-1 mt-0.5">{{ image.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox 组件 -->
    <Lightbox v-if="selectedImage" v-model="isLightboxOpen" :image="selectedImage!" :current-index="currentIndex"
      :total="displayImages.length" @previous="previousImage" @next="nextImage" />
  </div>
</template>

<style scoped>
.masonry {
  column-count: 1;
  column-gap: 1rem;
}

@media (min-width: 640px) {
  .masonry {
    column-count: 2;
  }
}

@media (min-width: 1024px) {
  .masonry {
    column-count: 3;
  }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 1rem;
}
</style>

<script setup lang="ts">
import galleryData from '~/data/gallery.json'
import ContentHeader from '~/part/ContentHeader.vue'
import Lightbox from '~/components/Lightbox.vue'

interface GalleryImage {
  id: number
  url: string
  title: string
  description: string
  aspectRatio: string
}

// 所有图片
const allImages = ref<GalleryImage[]>(galleryData)

// 随机显示的 5 张图片
const displayImages = ref<GalleryImage[]>([])

// 当前选中的图片
const selectedImage = ref<GalleryImage | null>(null)

// Lightbox 打开状态
const isLightboxOpen = computed({
  get: () => selectedImage.value !== null,
  set: (value) => {
    if (!value) selectedImage.value = null
  }
})

// 当前索引（避免模板中的空值类型报错）
const currentIndex = computed(() => {
  return selectedImage.value
    ? displayImages.value.findIndex(img => img.id === selectedImage.value!.id)
    : 0
})

// 初始化：随机选择 5 张图片
const initializeGallery = () => {
  const shuffled = [...allImages.value].sort(() => Math.random() - 0.5)
  displayImages.value = shuffled.slice(0, 5)
}

// 重新抽取 5 张图片
const reshuffle = () => {
  initializeGallery()
}

// 打开灯箱
const openLightbox = (image: GalleryImage) => {
  selectedImage.value = image
}

// 上一张
const previousImage = () => {
  if (!selectedImage.value) return
  const currentIndex = displayImages.value.findIndex(img => img.id === selectedImage.value!.id)
  const prevIndex = currentIndex === 0 ? displayImages.value.length - 1 : currentIndex - 1
  const prev = displayImages.value[prevIndex]
  if (prev) selectedImage.value = prev
}

// 下一张
const nextImage = () => {
  if (!selectedImage.value) return
  const currentIndex = displayImages.value.findIndex(img => img.id === selectedImage.value!.id)
  const nextIdx = currentIndex === displayImages.value.length - 1 ? 0 : currentIndex + 1
  const next = displayImages.value[nextIdx]
  if (next) selectedImage.value = next
}

// 键盘快捷键
const handleKeyboard = (event: KeyboardEvent) => {
  if (!selectedImage.value) return
  if (event.key === 'ArrowLeft') previousImage()
  if (event.key === 'ArrowRight') nextImage()
  if (event.key === 'Escape') selectedImage.value = null
}

onMounted(() => {
  initializeGallery()
  window.addEventListener('keydown', handleKeyboard)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyboard)
})

useHead({
  title: 'Gallery - MeanC Blog',
  meta: [
    {
      name: 'description',
      content: '浏览精选相册'
    }
  ]
})
</script>
