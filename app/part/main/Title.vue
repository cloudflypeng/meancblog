<template>
  <section class="masthead">
    <div class="masthead-left">
      <div id="logo" class="masthead-title">喝酒日报</div>
      <div class="masthead-subtitle">MeanC Blog</div>
    </div>
    <div class="masthead-right">
      <div class="masthead-meta" aria-label="time information">
        <div class="meta-item">
          <span class="meta-label">Date</span>
          <span class="meta-value">{{ dateStr }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Weekday</span>
          <span class="meta-value">{{ weekdayStr }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Time</span>
          <span class="meta-value">{{ timeStr }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Zone</span>
          <span class="meta-value">{{ zoneStr }}</span>
        </div>
      </div>
      <div class="masthead-actions" aria-label="theme controls">
        <ThemeColorPicker />
        <ThemeToggle />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const now = new Date()

const dateStr: string = now.toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
})

const weekdayStr: string = now.toLocaleDateString('zh-CN', { weekday: 'long' })
const timeStr: string = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
const zoneStr: string = Intl.DateTimeFormat('zh-CN', { timeZoneName: 'short' })
  .formatToParts(now)
  .find((part) => part.type === 'timeZoneName')?.value ?? 'GMT+8'
</script>

<style scoped>
.masthead {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 2px solid rgba(15, 23, 42, 0.8);
}

.masthead-left {
  display: grid;
  gap: 0.35rem;
}

.masthead-title {
  font-size: clamp(2.8rem, 6vw, 4.6rem);
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.masthead-subtitle {
  font-size: 0.95rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(55, 65, 81, 0.85);
}

.masthead-meta {
  display: grid;
  gap: 0.35rem;
  text-align: right;
}

.masthead-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
}

.masthead-actions {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.meta-item {
  display: grid;
  grid-template-columns: auto auto;
  gap: 0.75rem;
  justify-content: end;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.meta-label {
  color: rgba(71, 85, 105, 0.8);
}

.meta-value {
  font-weight: 600;
  color: rgba(15, 23, 42, 0.9);
}

@media (max-width: 720px) {
  .masthead {
    align-items: flex-start;
  }

  .masthead-right {
    align-items: flex-start;
  }

  .masthead-meta {
    text-align: left;
  }

  .meta-item {
    justify-content: start;
  }
}

:global(.dark) .masthead {
  border-bottom-color: rgba(226, 232, 240, 0.75);
}

:global(.dark) .masthead-subtitle {
  color: rgba(226, 232, 240, 0.7);
}

:global(.dark) .meta-label {
  color: rgba(226, 232, 240, 0.65);
}

:global(.dark) .meta-value {
  color: rgba(226, 232, 240, 0.9);
}
</style>
