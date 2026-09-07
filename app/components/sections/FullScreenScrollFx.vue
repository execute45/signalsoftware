<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ScrollSection = {
  leftLabel: string
  rightLabel: string
  title: string
}

const sections: ScrollSection[] = [
  { leftLabel: 'Idee', rightLabel: 'Idee', title: 'Problem' },
  { leftLabel: 'Konzept', rightLabel: 'Konzept', title: 'MVP' },
  { leftLabel: 'Build', rightLabel: 'Build', title: 'Produkt' },
  { leftLabel: 'Scale', rightLabel: 'Scale', title: 'Wachstum' },
]

const activeIndex = ref(0)
const displayTitle = ref(sections[0].title)
const scrollProgress = ref(0)

const trackEl = ref<HTMLElement | null>(null)
const titleEl = ref<HTMLElement | null>(null)
const worldEl = ref<HTMLElement | null>(null)
const atmosphereEl = ref<HTMLElement | null>(null)

const maxIndex = sections.length - 1
const progressCurrent = computed(() => String(activeIndex.value + 1).padStart(2, '0'))
const progressTotal = computed(() => String(sections.length).padStart(2, '0'))
const progressPercent = computed(() => scrollProgress.value * 100)

/** Desktop: original linear rise. Mobile: hidden until MVP, then soft linear rise. */
const WORLD_DESKTOP_HIDDEN = 380
const WORLD_DESKTOP_FULL = -48
const WORLD_MOBILE_HIDDEN = 260
const WORLD_MOBILE_FULL = -28

let st: ScrollTrigger | null = null
let titleTween: gsap.core.Timeline | null = null
let lastTitleIndex = -1
let mqCleanup: (() => void) | null = null

function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
}

function worldYForProgress(progress: number) {
  const p = Math.min(1, Math.max(0, progress))

  // Desktop: original smooth linear rise across the full scroll
  if (!isMobileViewport()) {
    return WORLD_DESKTOP_HIDDEN + (WORLD_DESKTOP_FULL - WORLD_DESKTOP_HIDDEN) * p
  }

  // Mobile: hidden through Problem; from MVP continuous linear rise (no pop, no ease lag)
  const mvpAt = 1 / 3
  if (p < mvpAt) return WORLD_MOBILE_HIDDEN
  const t = (p - mvpAt) / (1 - mvpAt)
  return WORLD_MOBILE_HIDDEN + (WORLD_MOBILE_FULL - WORLD_MOBILE_HIDDEN) * t
}

function setTitleForIndex(index: number, instant = false) {
  if (index === lastTitleIndex) return
  lastTitleIndex = index
  activeIndex.value = index

  if (instant) {
    displayTitle.value = sections[index].title
    gsap.set(titleEl.value, { opacity: 1, y: 0 })
    return
  }

  titleTween?.kill()
  titleTween = gsap.timeline()
  titleTween
    .to(titleEl.value, { opacity: 0, y: -16, duration: 0.15, ease: 'power2.in' })
    .add(() => {
      displayTitle.value = sections[index].title
    })
    .fromTo(
      titleEl.value,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' },
    )

  gsap.fromTo(
    atmosphereEl.value,
    { opacity: 0.65 },
    { opacity: 1, duration: 0.35, ease: 'power2.out' },
  )
}

function applyProgress(progress: number, instantTitle = false) {
  const p = Math.min(1, Math.max(0, progress))
  scrollProgress.value = p
  if (worldEl.value) {
    gsap.set(worldEl.value, { y: worldYForProgress(p) })
  }
  const index = Math.min(maxIndex, Math.max(0, Math.round(p * maxIndex)))
  setTitleForIndex(index, instantTitle)
}

function goTo(index: number) {
  if (!st) return
  const clamped = Math.min(maxIndex, Math.max(0, index))
  const progress = maxIndex === 0 ? 0 : clamped / maxIndex
  const target = st.start + (st.end - st.start) * progress
  window.scrollTo({ top: target, behavior: 'smooth' })
}

onMounted(() => {
  if (!trackEl.value) return

  gsap.set(titleEl.value, { opacity: 1, y: 0 })
  gsap.set(worldEl.value, {
    y: isMobileViewport() ? WORLD_MOBILE_HIDDEN : WORLD_DESKTOP_HIDDEN,
  })
  applyProgress(0, true)

  // Sticky only here: enough scroll for 4 steps, native scroll (no Lenis/snap/pin)
  st = ScrollTrigger.create({
    trigger: trackEl.value,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.4,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      applyProgress(self.progress)
    },
  })

  const mq = window.matchMedia('(max-width: 767px)')
  const onViewportChange = () => {
    applyProgress(scrollProgress.value)
    ScrollTrigger.refresh()
  }
  mq.addEventListener('change', onViewportChange)
  mqCleanup = () => mq.removeEventListener('change', onViewportChange)

  requestAnimationFrame(() => ScrollTrigger.refresh())
})

onUnmounted(() => {
  mqCleanup?.()
  mqCleanup = null
  titleTween?.kill()
  st?.kill()
  st = null
})
</script>

<template>
  <!-- Tall track = Vision→Launch needs real scroll distance -->
  <div
    id="prozess-fx"
    ref="trackEl"
    class="relative h-[320vh] w-full bg-black"
  >
    <section
      class="fx-space sticky top-0 isolate h-[100svh] w-full overflow-hidden text-white"
    >
      <div
        ref="atmosphereEl"
        class="fx-space-atmosphere pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      />
      <div
        class="fx-space-grid pointer-events-none absolute inset-x-0 top-0 z-0 h-[600px] w-full opacity-70"
        aria-hidden="true"
      />

      <div
        class="fx-world-wrap pointer-events-none absolute z-0"
        aria-hidden="true"
      >
        <div ref="worldEl" class="fx-world will-change-transform">
          <ClientOnly>
            <SectionsProcessGlobe />
          </ClientOnly>
        </div>
      </div>

      <div
        class="hero-horizon fx-horizon-front pointer-events-none absolute z-[2] origin-center"
        aria-hidden="true"
      />

      <div class="pointer-events-none absolute inset-x-0 top-24 z-20 text-center md:top-28">
        <p class="text-xs font-medium uppercase tracking-[0.35em] text-white/70 md:text-sm">
          Signal Software
        </p>
        <h2 class="mt-3 text-2xl font-semibold uppercase leading-none tracking-tight md:text-4xl lg:text-5xl">
          <span class="block">Der kreative</span>
          <span class="block">Prozess</span>
        </h2>
      </div>

      <div
        class="pointer-events-none absolute inset-0 z-20 hidden items-center justify-center md:flex"
      >
        <div class="flex w-full max-w-6xl items-center justify-between px-6 lg:px-8">
          <nav
            class="pointer-events-auto flex flex-col gap-5"
            aria-label="Abschnitte links"
          >
            <button
              v-for="(section, i) in sections"
              :key="`left-${section.leftLabel}`"
              type="button"
              class="flex items-center gap-2 text-left text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300"
              :class="i === activeIndex ? 'text-white' : 'text-white/35 hover:text-white/70'"
              @click="goTo(i)"
            >
              <span
                class="inline-block h-1 w-1 rounded-full bg-current transition-opacity"
                :class="i === activeIndex ? 'opacity-100' : 'opacity-0'"
              />
              {{ section.leftLabel }}
            </button>
          </nav>

          <nav
            class="pointer-events-auto flex flex-col items-end gap-5"
            aria-label="Abschnitte rechts"
          >
            <button
              v-for="(section, i) in sections"
              :key="`right-${section.rightLabel}`"
              type="button"
              class="flex items-center gap-2 text-right text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300"
              :class="i === activeIndex ? 'text-white' : 'text-white/35 hover:text-white/70'"
              @click="goTo(i)"
            >
              {{ section.rightLabel }}
              <span
                class="inline-block h-1 w-1 rounded-full bg-current transition-opacity"
                :class="i === activeIndex ? 'opacity-100' : 'opacity-0'"
              />
            </button>
          </nav>
        </div>
      </div>

      <div class="absolute inset-0 z-10 flex items-center justify-center px-6">
        <h3
          ref="titleEl"
          class="hero-title text-5xl font-bold uppercase tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {{ displayTitle }}
        </h3>
      </div>

      <div class="absolute inset-x-0 bottom-10 z-20 flex items-center justify-center gap-4 px-8 md:bottom-14">
        <span class="font-mono text-xs tabular-nums text-white/80">{{ progressCurrent }}</span>
        <div class="h-px w-40 max-w-[30vw] overflow-hidden bg-white/25 md:w-56">
          <div
            class="h-full bg-white"
            :style="{ width: `${progressPercent}%` }"
          />
        </div>
        <span class="font-mono text-xs tabular-nums text-white/80">{{ progressTotal }}</span>
      </div>
    </section>
  </div>
</template>
