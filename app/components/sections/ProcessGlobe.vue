<script setup lang="ts">
import createGlobe from 'cobe'

const rootEl = ref<HTMLElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)

let globe: ReturnType<typeof createGlobe> | null = null
let phi = 0.35
let rafId = 0
let running = false
let visible = false
let io: IntersectionObserver | null = null

function tick() {
  if (!running || !globe || !visible) return
  phi += 0.0025
  globe.update({ phi })
  rafId = requestAnimationFrame(tick)
}

function startLoop() {
  if (running) return
  running = true
  rafId = requestAnimationFrame(tick)
}

function stopLoop() {
  running = false
  cancelAnimationFrame(rafId)
}

onMounted(() => {
  if (!canvasEl.value || !rootEl.value) return

  const size = 700

  globe = createGlobe(canvasEl.value, {
    devicePixelRatio: 2,
    width: size,
    height: size,
    phi,
    theta: 0.22,
    dark: 1,
    diffuse: 1.8,
    mapSamples: 18000,
    mapBrightness: 4,
    baseColor: [1, 1, 1],
    markerColor: [0.4, 0.7, 1],
    glowColor: [1, 1, 1],
    markers: [],
  })

  globe.update({ phi })
  window.setTimeout(() => globe?.update({ phi }), 200)
  window.setTimeout(() => globe?.update({ phi }), 600)

  io = new IntersectionObserver(
    ([entry]) => {
      visible = Boolean(entry?.isIntersecting)
      if (visible) {
        globe?.update({ phi })
        startLoop()
      }
      else {
        stopLoop()
      }
    },
    { rootMargin: '300px 0px', threshold: 0 },
  )
  io.observe(rootEl.value)
})

onUnmounted(() => {
  io?.disconnect()
  io = null
  stopLoop()
  globe?.destroy()
  globe = null
})
</script>

<template>
  <div ref="rootEl" class="h-full w-full">
    <canvas
      ref="canvasEl"
      class="fx-globe-canvas h-full w-full"
      aria-hidden="true"
    />
  </div>
</template>
