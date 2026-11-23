<script setup lang="ts">
const props = defineProps<{
  slug: string
  color: string
  label: string
}>()

const cdnSrc = computed(() => `https://cdn.simpleicons.org/${props.slug}/${props.color.replace('#', '')}`)
</script>

<template>
  <img
    :src="cdnSrc"
    :alt="`${label} Logo`"
    width="18"
    height="18"
    class="size-[18px] shrink-0"
    loading="lazy"
    decoding="async"
  >
</template>