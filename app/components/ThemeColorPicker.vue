<script setup lang="ts">
import { computed, onMounted } from 'vue'

const appConfig = useAppConfig()

const STORAGE_KEY = 'meanc-theme-colors'

const primaryColors = [
  'emerald',
  'green',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime'
] as const

const neutralColors = ['slate', 'gray', 'zinc', 'neutral', 'stone'] as const

type PrimaryColor = (typeof primaryColors)[number]
type NeutralColor = (typeof neutralColors)[number]

type ThemeColors = {
  primary?: PrimaryColor
  neutral?: NeutralColor
}

const colorClassMap: Record<PrimaryColor | NeutralColor, string> = {
  emerald: 'bg-emerald-500',
  green: 'bg-green-500',
  teal: 'bg-teal-500',
  cyan: 'bg-cyan-500',
  sky: 'bg-sky-500',
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  violet: 'bg-violet-500',
  purple: 'bg-purple-500',
  fuchsia: 'bg-fuchsia-500',
  pink: 'bg-pink-500',
  rose: 'bg-rose-500',
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  amber: 'bg-amber-500',
  yellow: 'bg-yellow-500',
  lime: 'bg-lime-500',
  slate: 'bg-slate-500',
  gray: 'bg-gray-500',
  zinc: 'bg-zinc-500',
  neutral: 'bg-neutral-500',
  stone: 'bg-stone-500'
}

const ringClassMap: Record<PrimaryColor | NeutralColor, string> = {
  emerald: 'ring-emerald-500',
  green: 'ring-green-500',
  teal: 'ring-teal-500',
  cyan: 'ring-cyan-500',
  sky: 'ring-sky-500',
  blue: 'ring-blue-500',
  indigo: 'ring-indigo-500',
  violet: 'ring-violet-500',
  purple: 'ring-purple-500',
  fuchsia: 'ring-fuchsia-500',
  pink: 'ring-pink-500',
  rose: 'ring-rose-500',
  red: 'ring-red-500',
  orange: 'ring-orange-500',
  amber: 'ring-amber-500',
  yellow: 'ring-yellow-500',
  lime: 'ring-lime-500',
  slate: 'ring-slate-500',
  gray: 'ring-gray-500',
  zinc: 'ring-zinc-500',
  neutral: 'ring-neutral-500',
  stone: 'ring-stone-500'
}

const normalizePrimary = (value: unknown): PrimaryColor | null => {
  if (typeof value !== 'string') return null
  return (primaryColors as readonly string[]).includes(value) ? (value as PrimaryColor) : null
}

const normalizeNeutral = (value: unknown): NeutralColor | null => {
  if (typeof value !== 'string') return null
  return (neutralColors as readonly string[]).includes(value) ? (value as NeutralColor) : null
}

const currentPrimary = computed<PrimaryColor>(() => normalizePrimary(appConfig.ui?.colors?.primary) ?? 'rose')
const currentNeutral = computed<NeutralColor>(() => normalizeNeutral(appConfig.ui?.colors?.neutral) ?? 'slate')

const ensureConfig = () => {
  if (!appConfig.ui) appConfig.ui = {}
  if (!appConfig.ui.colors) appConfig.ui.colors = {}
}

const saveToStorage = () => {
  if (!import.meta.client) return

  const payload = {
    primary: currentPrimary.value,
    neutral: currentNeutral.value
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

const applyColors = (colors: ThemeColors) => {
  ensureConfig()
  Object.assign(appConfig.ui!.colors!, colors)
  saveToStorage()
}

const setPrimary = (color: PrimaryColor) => {
  applyColors({ primary: color })
}

const setNeutral = (color: NeutralColor) => {
  applyColors({ neutral: color })
}

onMounted(() => {
  if (!import.meta.client) return

  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return

  try {
    const parsed = JSON.parse(raw) as ThemeColors
    const nextPrimary = normalizePrimary(parsed.primary)
    const nextNeutral = normalizeNeutral(parsed.neutral)

    if (nextPrimary || nextNeutral) {
      applyColors({
        ...(nextPrimary ? { primary: nextPrimary } : {}),
        ...(nextNeutral ? { neutral: nextNeutral } : {})
      })
    }
  } catch {
    // ignore malformed storage
  }
})
</script>

<template>
  <UPopover :ui="{ content: 'p-3 w-64' }">
    <UButton
      color="neutral"
      variant="ghost"
      class="gap-2"
      aria-label="Change theme colors"
      title="Change theme colors"
    >
      <span class="inline-flex items-center gap-1.5">
        <span
          class="size-3 rounded-full ring-1 ring-white/40"
          :class="colorClassMap[currentPrimary]"
        />
        <span
          class="size-3 rounded-full ring-1 ring-white/40"
          :class="colorClassMap[currentNeutral]"
        />
      </span>
      <UIcon name="i-heroicons-swatch-20-solid" class="size-5 text-primary" />
    </UButton>

    <template #content>
      <div class="flex flex-col gap-3">
        <div>
          <div class="text-xs font-semibold text-gray-500 dark:text-gray-400">Primary</div>
          <div class="mt-2 grid grid-cols-6 gap-2">
            <button
              v-for="color in primaryColors"
              :key="color"
              type="button"
              class="size-5 rounded-full ring-2 ring-offset-2 ring-offset-white transition dark:ring-offset-gray-900"
              :class="[colorClassMap[color], currentPrimary === color ? ringClassMap[color] : 'ring-transparent']"
              :aria-pressed="currentPrimary === color"
              :title="color"
              @click="setPrimary(color)"
            />
          </div>
        </div>
        <div>
          <div class="text-xs font-semibold text-gray-500 dark:text-gray-400">Neutral</div>
          <div class="mt-2 grid grid-cols-5 gap-2">
            <button
              v-for="color in neutralColors"
              :key="color"
              type="button"
              class="size-5 rounded-full ring-2 ring-offset-2 ring-offset-white transition dark:ring-offset-gray-900"
              :class="[colorClassMap[color], currentNeutral === color ? ringClassMap[color] : 'ring-transparent']"
              :aria-pressed="currentNeutral === color"
              :title="color"
              @click="setNeutral(color)"
            />
          </div>
        </div>
      </div>
    </template>
  </UPopover>
</template>
