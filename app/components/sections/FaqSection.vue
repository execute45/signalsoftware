<script setup lang="ts">
defineProps<{
  faqs: {
    question: string
    answer: string
  }[]
}>()

const open = ref<Record<string, boolean>>({})

function paragraphs(answer: string) {
  return answer.split(/\n\n+/).filter(Boolean)
}

function toggle(question: string) {
  open.value[question] = !open.value[question]
}

function isOpen(question: string) {
  return !!open.value[question]
}
</script>

<template>
  <section id="faq" class="section-padding bg-muted/30">
    <div class="container-site">
      <UiSectionHeading
        label="FAQ"
        title="Häufige Fragen"
        description="Die FAQ zu Signal Software beantwortet direkt, was Kosten, Laufzeit, Zusammenarbeit und Projektstart bei individueller Software und Landingpages in Deutschland bedeuten. Sie erhalten kurze, konkrete Antworten ohne Verkaufssprache; fehlt Ihr Fall, klären wir ihn im Erstgespräch oder per E-Mail."
        align="center"
      />

      <div class="mx-auto mt-12 max-w-3xl space-y-3">
        <div
          v-for="faq in faqs"
          :key="faq.question"
          class="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-ring/30"
        >
          <button
            type="button"
            class="flex w-full items-start justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
            :aria-expanded="isOpen(faq.question)"
            @click="toggle(faq.question)"
          >
            <h3 class="text-base font-semibold tracking-tight text-foreground md:text-lg">
              {{ faq.question }}
            </h3>
            <span
              class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 text-muted-foreground transition-transform duration-200"
              :class="isOpen(faq.question) ? 'rotate-180' : ''"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          <div
            class="grid transition-[grid-template-rows] duration-200 ease-out"
            :class="isOpen(faq.question) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
          >
            <div class="min-h-0 overflow-hidden">
              <div class="space-y-3 border-t border-border px-5 pb-5 pt-4 md:px-6 md:pb-6">
                <p
                  v-for="(paragraph, i) in paragraphs(faq.answer)"
                  :key="i"
                  class="text-base leading-relaxed text-muted-foreground"
                >
                  {{ paragraph }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>