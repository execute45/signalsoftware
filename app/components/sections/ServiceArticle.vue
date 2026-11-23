<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { CodeShowcaseState } from '~/components/ui/CodeShowcase.vue'
import { useCodeShowcaseScroll } from '~/composables/useCodeShowcaseScroll'

const props = defineProps<{
  eyebrow: string
  title: string
  lead: string
  splitFirstSection?: boolean
  codeShowcaseStates?: CodeShowcaseState[]
  sections: Array<{
    heading: string
    paragraphs: string[]
    items?: string[]
  }>
}>()

const route = useRoute()

const codeShowcaseStatesRef = toRef(props, 'codeShowcaseStates')

const useCodeScrollLayout = computed(
  () => props.splitFirstSection && (props.codeShowcaseStates?.length ?? 0) > 0,
)

const {
  activeStep,
  currentCode,
  scrollEndRef,
  setSectionRef,
  trafficRedOn,
  trafficYellowOn,
  trafficGreenOn,
  pickActiveStep,
} = useCodeShowcaseScroll(() => props.sections.length, codeShowcaseStatesRef)

const titleLines = computed(() => {
  const space = props.title.indexOf(' ')
  if (space === -1) {
    return [props.title]
  }
  return [props.title.slice(0, space), props.title.slice(space + 1)]
})

const pageHeroEl = ref<HTMLElement | null>(null)
const moonEl = ref<HTMLElement | null>(null)

let moonScrollTrigger: ScrollTrigger | null = null

function moonScrollRange() {
  const moon = moonEl.value
  const hero = pageHeroEl.value
  if (!moon || !hero) {
    return { startY: 0, endY: 0 }
  }

  const h = moon.offsetHeight
  const startY = h * 0.5
  const endY = -Math.min(hero.offsetHeight * 0.38, h * 0.62)
  return { startY, endY }
}

function setMoonScrollProgress(progress: number) {
  if (!moonEl.value) return
  const { startY, endY } = moonScrollRange()
  const y = startY + (endY - startY) * progress
  gsap.set(moonEl.value, { y })
}

function initMoonScroll() {
  if (!pageHeroEl.value || !moonEl.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const { endY } = moonScrollRange()
    gsap.set(moonEl.value, { y: endY * 0.35 })
    return
  }

  gsap.registerPlugin(ScrollTrigger)
  moonScrollTrigger?.kill()

  moonScrollTrigger = ScrollTrigger.create({
    trigger: pageHeroEl.value,
    start: 'top top',
    end: 'bottom top',
    scrub: 0.45,
    invalidateOnRefresh: true,
    onUpdate: (self) => setMoonScrollProgress(self.progress),
  })

  setMoonScrollProgress(moonScrollTrigger.progress)
}

onMounted(() => {
  nextTick(() => {
    initMoonScroll()
    window.addEventListener('resize', onMoonResize, { passive: true })
  })
})

watch(
  () => route.path,
  () => {
    nextTick(() => {
      initMoonScroll()
      pickActiveStep()
    })
  },
)

onUnmounted(() => {
  moonScrollTrigger?.kill()
  moonScrollTrigger = null
  window.removeEventListener('resize', onMoonResize)
})

function onMoonResize() {
  moonScrollTrigger?.refresh()
  if (moonScrollTrigger) {
    setMoonScrollProgress(moonScrollTrigger.progress)
  }
}

</script>

<template>
  <div>
    <section
      ref="pageHeroEl"
      class="page-hero relative isolate -mt-16 overflow-hidden bg-black md:-mt-20"
    >
      <div class="hero-atmosphere pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      <div
        class="hero-grid pointer-events-none absolute inset-x-0 top-0 z-0 h-[520px] w-full opacity-80"
        aria-hidden="true"
      />

      <div
        ref="moonEl"
        class="page-hero-horizon pointer-events-none absolute z-[1] will-change-transform"
        aria-hidden="true"
      />

      <div class="container-site relative z-10 flex min-h-[32rem] items-center pt-28 pb-20 md:min-h-[38rem] md:pt-32 md:pb-24 lg:min-h-[42rem]">
        <div class="relative z-20 w-fit max-w-full overflow-visible text-left">
          <p class="hero-badge-inner">
            {{ eyebrow }}
          </p>

          <h1 class="hero-title mt-6 w-fit max-w-none text-5xl font-semibold leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-7xl">
            <span
              v-for="(line, index) in titleLines"
              :key="index"
              class="block"
              :class="index > 0 ? 'lg:whitespace-nowrap' : ''"
            >
              {{ line }}
            </span>
          </h1>

          <p class="hero-subtitle mt-6 max-w-lg text-pretty text-base tracking-tight md:mt-8 md:text-lg">
            {{ lead }}
          </p>

          <NuxtLink
            to="#kontakt"
            class="hero-cta mt-8 inline-flex h-10 w-fit items-center justify-center md:mt-10 md:w-52"
          >
            Projekt anfragen
          </NuxtLink>
        </div>
      </div>
    </section>

    <article class="bg-black text-foreground">
      <div v-if="useCodeScrollLayout" class="container-site section-padding">
        <div class="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div class="min-w-0 space-y-14 md:space-y-16">
            <section
              v-for="(section, index) in sections"
              :key="section.heading"
              :ref="(el) => setSectionRef(el, index)"
            >
              <h2
                class="text-2xl font-semibold tracking-tight md:text-3xl"
                :class="index === 0 ? 'lg:text-4xl' : ''"
              >
                {{ section.heading }}
              </h2>
              <p
                v-for="paragraph in section.paragraphs"
                :key="paragraph"
                class="mt-4 text-base leading-relaxed text-foreground/90"
                :class="index === 0 ? 'md:text-lg' : ''"
              >
                {{ paragraph }}
              </p>
              <ul
                v-if="section.items"
                class="mt-4 list-disc space-y-2 pl-5 text-foreground/90"
              >
                <li v-for="item in section.items" :key="item">
                  {{ item }}
                </li>
              </ul>
            </section>

            <div
              ref="scrollEndRef"
              class="pointer-events-none h-px w-full"
              aria-hidden="true"
            />
          </div>

          <Transition v-if="currentCode" name="service-code" mode="out-in">
            <UiCodeShowcase
              :key="activeStep"
              :state="currentCode"
              :traffic-red="trafficRedOn"
              :traffic-yellow="trafficYellowOn"
              :traffic-green="trafficGreenOn"
            />
          </Transition>
        </div>
      </div>

      <div v-else class="container-site section-padding">
        <div class="max-w-2xl space-y-12">
          <section v-for="section in sections" :key="section.heading">
            <h2 class="text-2xl font-semibold tracking-tight">
              {{ section.heading }}
            </h2>
            <p
              v-for="paragraph in section.paragraphs"
              :key="paragraph"
              class="mt-4 text-base leading-relaxed text-foreground/90"
            >
              {{ paragraph }}
            </p>
            <ul v-if="section.items" class="mt-4 list-disc space-y-2 pl-5 text-foreground/90">
              <li v-for="item in section.items" :key="item">
                {{ item }}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.service-code-enter-active,
.service-code-leave-active {
  transition: opacity 0.2s ease;
}

.service-code-enter-from,
.service-code-leave-to {
  opacity: 0;
}
</style>
