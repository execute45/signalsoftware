import type { CodeShowcaseState } from '~/components/ui/CodeShowcase.vue'

export function useCodeShowcaseScroll(
  sectionCount: MaybeRefOrGetter<number>,
  states: Ref<CodeShowcaseState[] | undefined>,
) {
  const count = computed(() => toValue(sectionCount))
  const activeStep = ref(0)
  const sectionRefs = ref<(HTMLElement | null)[]>([])
  const scrollEndRef = ref<HTMLElement | null>(null)

  const currentCode = computed(() => {
    const list = states.value
    if (!list?.length) return null
    return list[activeStep.value] ?? list[0]
  })

  const maxStep = computed(() => Math.max(0, (states.value?.length ?? 1) - 1))

  const trafficRedOn = computed(() => activeStep.value >= 1)
  const trafficYellowOn = computed(() => activeStep.value >= 2)
  const trafficGreenOn = computed(() => activeStep.value >= maxStep.value)

  function setSectionRef(el: unknown, index: number) {
    if (el instanceof HTMLElement) {
      sectionRefs.value[index] = el
    }
  }

  function pickActiveStep() {
    if (typeof window === 'undefined' || !window.matchMedia('(min-width: 1024px)').matches) {
      return
    }

    const anchor = window.innerHeight * 0.42
    const lastStep = maxStep.value

    const first = sectionRefs.value[0]
    if (first && first.getBoundingClientRect().bottom > anchor - 48) {
      activeStep.value = 0
      return
    }

    const lastSection = sectionRefs.value[count.value - 1]
    if (lastSection && lastSection.getBoundingClientRect().bottom < anchor) {
      activeStep.value = lastStep
      return
    }

    if (scrollEndRef.value && scrollEndRef.value.getBoundingClientRect().top < anchor + 120) {
      activeStep.value = lastStep
      return
    }

    let bestIndex = -1
    let bestDist = Infinity

    sectionRefs.value.forEach((el, index) => {
      if (!el || index >= count.value) return
      const rect = el.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      if (rect.top > anchor + 48) return
      const center = (rect.top + rect.bottom) / 2
      const dist = Math.abs(center - anchor)
      if (dist < bestDist) {
        bestDist = dist
        bestIndex = index
      }
    })

    if (bestIndex >= 0) {
      activeStep.value = Math.min(bestIndex, lastStep)
      return
    }

    activeStep.value = Math.min(1, lastStep)
  }

  let rafId = 0
  function onScrollOrResize() {
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(pickActiveStep)
  }

  onMounted(() => {
    if (!states.value?.length) return
    pickActiveStep()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })
  })

  onUnmounted(() => {
    cancelAnimationFrame(rafId)
    window.removeEventListener('scroll', onScrollOrResize)
    window.removeEventListener('resize', onScrollOrResize)
  })

  watch(count, () => nextTick(() => pickActiveStep()))

  return {
    activeStep,
    currentCode,
    sectionRefs,
    scrollEndRef,
    setSectionRef,
    trafficRedOn,
    trafficYellowOn,
    trafficGreenOn,
    pickActiveStep,
  }
}