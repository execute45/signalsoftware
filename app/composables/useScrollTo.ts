export function useScrollTo() {
  const router = useRouter()
  const route = useRoute()

  function scrollToElement(id: string) {
    const element = document.getElementById(id)
    if (!element) return false
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return true
  }

  async function scrollToSection(id: string) {
    if (scrollToElement(id)) return

    if (route.path !== '/') {
      await router.push({ path: '/', hash: `#${id}` })
      await nextTick()
      // Wait for homepage sections to mount after navigation.
      requestAnimationFrame(() => {
        if (!scrollToElement(id)) {
          setTimeout(() => scrollToElement(id), 100)
        }
      })
    }
  }

  return { scrollToSection }
}
