<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const navLinks = [
  { label: 'Warum wir', id: 'warum' },
  { label: 'Leistungen', id: 'leistungen' },
  { label: 'Prozess', id: 'prozess' },
  { label: 'Tech-Stack', id: 'tech' },
  { label: 'Kontakt', id: 'kontakt' },
]

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const { scrollToSection } = useScrollTo()

const isHome = computed(() => route.path === '/')

const hasImmersiveHero = computed(
  () => isHome.value || route.meta.darkHero === true,
)

const showGlassNav = computed(() => isScrolled.value || !hasImmersiveHero.value)

function handleNavClick(id: string) {
  scrollToSection(id)
  isMobileMenuOpen.value = false
}

function goHome() {
  isMobileMenuOpen.value = false
  if (isHome.value) {
    scrollToSection('hero')
    return
  }
  router.push('/')
}

function onScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

watch(
  () => route.path,
  () => nextTick(() => onScroll()),
)

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    :class="[
      'fixed inset-x-0 top-0 z-50 transition-all duration-300',
      showGlassNav
        ? 'glass-nav shadow-lg shadow-black/20'
        : 'bg-transparent',
    ]"
  >
    <div class="container-site flex h-16 items-center justify-between md:h-20">
      <button
        class="flex items-center text-left"
        aria-label="Signal Software Startseite"
        @click="goHome"
      >
        <img
          src="/logo.png"
          alt="Signal Software"
          class="h-8 w-auto md:h-9"
          width="480"
          height="128"
        >
      </button>

      <nav class="hidden items-center gap-8 md:flex" aria-label="Hauptnavigation">
        <button
          v-for="link in navLinks"
          :key="link.id"
          class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          @click="handleNavClick(link.id)"
        >
          {{ link.label }}
        </button>
        <UiBaseButton variant="primary" @click="handleNavClick('kontakt')">
          Projekt anfragen
        </UiBaseButton>
      </nav>

      <button
        class="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Menü öffnen"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <svg
          v-if="!isMobileMenuOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div
      v-if="isMobileMenuOpen"
      class="border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
    >
      <nav class="container-site flex flex-col gap-1 py-4" aria-label="Mobile Navigation">
        <button
          v-for="link in navLinks"
          :key="link.id"
          class="rounded-lg px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          @click="handleNavClick(link.id)"
        >
          {{ link.label }}
        </button>
        <div class="mt-2 px-4">
          <UiBaseButton variant="primary" @click="handleNavClick('kontakt')">
            Projekt anfragen
          </UiBaseButton>
        </div>
      </nav>
    </div>
  </header>
</template>
