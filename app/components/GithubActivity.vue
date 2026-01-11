<script setup>
const { data, status } = await useFetch('/api/github-contributions', {
  lazy: true,
  server: false // fetching on client to avoid hydration mismatch if dates change or just to offload
})

const days = computed(() => data.value?.days || [])

// 格式化日期提示
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}
</script>

<template>
  <div v-if="status === 'success' && days.length" class="flex items-center gap-2"
    title="GitHub Contributions (Last 15 Days)">
    <div class="flex gap-1">
      <UTooltip v-for="day in days" :key="day.date"
        :text="`${day.contributionCount} contributions on ${formatDate(day.date)}`" :popper="{ placement: 'top' }">
        <div
          class="w-3 h-3 sm:w-4 sm:h-4 rounded-sm transition-transform hover:scale-125 hover:z-10 cursor-default ring-1 ring-inset ring-black/5 dark:ring-white/5"
          :style="{ backgroundColor: day.color }"></div>
      </UTooltip>
    </div>
  </div>
</template>
