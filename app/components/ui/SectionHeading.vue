<script setup lang="ts">
defineProps<{
  label: string
  title: string
  description?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <div
    :class="[
      'mb-12 md:mb-16',
      align === 'center' ? 'text-center' : 'text-left',
    ]"
  >
    <p class="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
      {{ label }}
    </p>
    <h2 class="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
      {{ title }}
    </h2>
    <p
      v-if="description"
      :class="[
        'mt-4 max-w-2xl text-lg text-muted-foreground',
        align === 'center' ? 'mx-auto' : '',
      ]"
    >
      {{ description }}
    </p>
  </div>
</template>
