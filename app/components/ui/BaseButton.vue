<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'ghost'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    href?: string
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:opacity-90',
  secondary:
    'border border-border bg-secondary text-secondary-foreground hover:bg-accent',
  ghost: 'text-muted-foreground hover:text-foreground hover:bg-accent',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50'
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :class="[baseClasses, variantClasses[variant]]"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="[baseClasses, variantClasses[variant]]"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>
