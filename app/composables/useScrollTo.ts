export function useScrollTo() {
  function scrollToSection(id: string) {
    const element = document.getElementById(id)
    if (!element) return
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return { scrollToSection }
}
