<script setup lang="ts">
export type ProjectField = { key: string, value: string }

export type CodeShowcaseState =
  | {
      kind: 'project'
      caption: string
      fields: ProjectField[]
      comment?: string
    }
  | {
      kind: 'terminal'
      caption: string
      lines: { text: string, accent?: boolean }[]
    }

withDefaults(
  defineProps<{
    state: CodeShowcaseState
    trafficRed?: boolean
    trafficYellow?: boolean
    trafficGreen?: boolean
    sticky?: boolean
  }>(),
  {
    trafficRed: false,
    trafficYellow: false,
    trafficGreen: false,
    sticky: true,
  },
)
</script>

<template>
  <div
    :class="[
      'relative',
      sticky ? 'lg:sticky lg:top-24 lg:self-start xl:top-28' : '',
    ]"
    aria-live="polite"
  >
    <div
      class="absolute -inset-4 rounded-3xl bg-accent/20 blur-2xl"
      aria-hidden="true"
    />
    <div class="card-surface relative space-y-4 p-8">
      <div class="flex items-center gap-2 border-b border-border pb-6">
        <div
          class="h-3 w-3 rounded-full transition-[background-color,box-shadow,transform] duration-300"
          :class="
            trafficRed
              ? 'bg-[#ff5f57] shadow-[0_0_8px_rgba(255,95,87,0.45)]'
              : 'bg-muted-foreground/35'
          "
          aria-hidden="true"
        />
        <div
          class="h-3 w-3 rounded-full transition-[background-color,box-shadow,transform] duration-300"
          :class="
            trafficYellow
              ? 'bg-[#febc2e] shadow-[0_0_8px_rgba(254,188,46,0.4)]'
              : 'bg-muted-foreground/35'
          "
          aria-hidden="true"
        />
        <div
          class="h-3 w-3 rounded-full transition-[background-color,box-shadow,transform] duration-300"
          :class="
            trafficGreen
              ? 'scale-110 bg-[#28c840] shadow-[0_0_10px_rgba(40,200,64,0.65)]'
              : 'bg-muted-foreground/35'
          "
          aria-hidden="true"
        />
        <span class="ml-2 font-mono text-xs text-muted-foreground">
          {{ state.kind === 'terminal' ? 'deploy.sh' : 'signalsoftware.de' }}
        </span>
      </div>

      <pre class="m-0 overflow-x-auto font-mono text-sm leading-snug"><code
        v-if="state.kind === 'project'"
        class="block"
      >
        <span v-if="state.comment" class="block text-muted-foreground">{{ state.comment }}</span>
        <span class="block"><span class="text-foreground">const</span> <span class="text-muted-foreground">project</span> = {</span>
        <span
          v-for="(field, i) in state.fields"
          :key="field.key"
          class="block"
        ><span class="text-muted-foreground">  {{ field.key }}:</span> <span class="text-foreground">'{{ field.value }}'</span><span class="text-muted-foreground">{{ i < state.fields.length - 1 ? ',' : '' }}</span></span>
        <span class="block">}</span>
      </code><code
        v-else
        class="block"
      >
        <span
          v-for="(line, i) in state.lines"
          :key="i"
          class="block leading-snug"
          :class="line.accent ? 'text-foreground' : 'text-muted-foreground'"
        >{{ line.text }}</span>
      </code></pre>

      <p class="m-0 text-sm leading-snug text-muted-foreground">
        {{ state.caption }}
      </p>
    </div>
  </div>
</template>