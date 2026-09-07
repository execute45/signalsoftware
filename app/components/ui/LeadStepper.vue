<script setup lang="ts">
import { z } from 'zod'
import {
  AppWindow,
  ArrowLeft,
  BadgeCheck,
  CalendarClock,
  Check,
  Globe,
  LayoutTemplate,
  Lock,
  Rocket,
  RefreshCw,
  ShoppingCart,
  Sparkles,
  Wallet,
} from 'lucide-vue-next'
import type { Component } from 'vue'

type StepOption = {
  value: string
  label: string
  icon: Component
}

const TOTAL_STEPS = 5

const projectOptions: StepOption[] = [
  { value: 'Web-App', label: 'Web-App', icon: AppWindow },
  { value: 'Landingpage', label: 'Landingpage', icon: LayoutTemplate },
  { value: 'E-Commerce', label: 'E-Commerce', icon: ShoppingCart },
  { value: 'Internes Tool', label: 'Internes Tool', icon: Globe },
]

const goalOptions: StepOption[] = [
  { value: 'MVP / Launch', label: 'MVP / Launch', icon: Rocket },
  { value: 'Redesign', label: 'Redesign', icon: RefreshCw },
  { value: 'Neues Feature', label: 'Neues Feature', icon: Sparkles },
  { value: 'Skalierung', label: 'Skalierung', icon: BadgeCheck },
]

const timelineOptions: StepOption[] = [
  { value: 'ASAP', label: 'So schnell wie möglich', icon: Rocket },
  { value: '1–3 Monate', label: '1–3 Monate', icon: CalendarClock },
  { value: '3–6 Monate', label: '3–6 Monate', icon: CalendarClock },
  { value: 'Flexibel', label: 'Flexibel', icon: CalendarClock },
]

const budgetOptions: StepOption[] = [
  { value: 'Unter 5.000 €', label: 'Unter 5.000 €', icon: Wallet },
  { value: '5.000–15.000 €', label: '5.000–15.000 €', icon: Wallet },
  { value: '15.000–50.000 €', label: '15.000–50.000 €', icon: Wallet },
  { value: 'Offen / individuell', label: 'Offen / individuell', icon: Wallet },
]

const contactSchema = z.object({
  name: z.string().min(2, 'Bitte geben Sie Ihren Namen ein (mind. 2 Zeichen).'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
  company: z.string().optional(),
  message: z.string().min(10, 'Ihre Nachricht sollte mindestens 10 Zeichen lang sein.'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Bitte stimmen Sie der Datenverarbeitung zu.' }),
  }),
})

const step = ref(1)
const answers = reactive({
  projectType: '',
  goal: '',
  timeline: '',
  budget: '',
})

const form = reactive({
  name: '',
  email: '',
  company: '',
  message: '',
  consent: false,
})

const errors = reactive<Partial<Record<'name' | 'email' | 'message' | 'consent', string>>>({})
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const submitMessage = ref('')

const progress = computed(() => (step.value / TOTAL_STEPS) * 100)

const stepMeta = computed(() => {
  switch (step.value) {
    case 1:
      return {
        question: 'Was für ein Projekt planen Sie?',
        options: projectOptions,
        key: 'projectType' as const,
      }
    case 2:
      return {
        question: 'Was ist Ihr Ziel?',
        options: goalOptions,
        key: 'goal' as const,
      }
    case 3:
      return {
        question: 'Wie ist Ihr Zeitrahmen?',
        options: timelineOptions,
        key: 'timeline' as const,
      }
    case 4:
      return {
        question: 'Welches Budget haben Sie ungefähr?',
        options: budgetOptions,
        key: 'budget' as const,
      }
    default:
      return null
  }
})

function selectOption(key: 'projectType' | 'goal' | 'timeline' | 'budget', value: string) {
  answers[key] = value
  if (step.value < TOTAL_STEPS) {
    step.value += 1
  }
}

function goBack() {
  if (step.value > 1) {
    step.value -= 1
    submitStatus.value = 'idle'
    submitMessage.value = ''
  }
}

function validateContact(): boolean {
  Object.keys(errors).forEach((key) => {
    delete errors[key as keyof typeof errors]
  })

  const result = contactSchema.safeParse(form)
  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof typeof errors
      if (!errors[field]) {
        errors[field] = issue.message
      }
    }
    return false
  }
  return true
}

async function handleSubmit() {
  submitStatus.value = 'idle'
  submitMessage.value = ''

  if (!validateContact()) return

  isSubmitting.value = true

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        company: form.company || undefined,
        message: form.message,
        projectType: answers.projectType || undefined,
        goal: answers.goal || undefined,
        timeline: answers.timeline || undefined,
        budget: answers.budget || undefined,
      },
    })

    submitStatus.value = 'success'
    submitMessage.value = 'Vielen Dank! Wir melden uns in Kürze bei Ihnen.'
    step.value = TOTAL_STEPS + 1
  }
  catch {
    submitStatus.value = 'error'
    submitMessage.value = 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt per E-Mail.'
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="lead-stepper">
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="max-w-xl">
        <span class="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
          KOSTENLOSES ERSTGESPRÄCH
        </span>
        <h3 class="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Starten Sie jetzt Ihren Projekt-Check.
        </h3>
        <ul class="mt-4 space-y-2 text-sm text-muted-foreground">
          <li class="flex items-start gap-2">
            <Check class="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
            Klare Einschätzung zu Scope, Timeline und Budget
          </li>
          <li class="flex items-start gap-2">
            <Check class="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
            Persönliche Beratung statt generischer Angebote
          </li>
          <li class="flex items-start gap-2">
            <Check class="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
            Antwort in der Regel innerhalb von 24 Stunden
          </li>
        </ul>
      </div>
    </div>

    <div
      v-if="step <= TOTAL_STEPS"
      class="mb-8 h-1 overflow-hidden rounded-full bg-border"
      aria-hidden="true"
    >
      <div
        class="h-full rounded-full bg-foreground transition-all duration-500 ease-out"
        :style="{ width: `${progress}%` }"
      />
    </div>

    <div v-if="step <= TOTAL_STEPS && step < TOTAL_STEPS" class="space-y-6">
      <div class="flex items-center justify-between gap-4">
        <button
          v-if="step > 1"
          type="button"
          class="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          @click="goBack"
        >
          <ArrowLeft class="h-4 w-4" />
          Zurück
        </button>
        <p v-else class="text-sm text-muted-foreground">Los geht’s</p>
        <p class="text-sm text-muted-foreground">
          Schritt {{ step }} von {{ TOTAL_STEPS }}
        </p>
      </div>

      <h4 class="text-center text-xl font-semibold tracking-tight text-foreground md:text-2xl">
        {{ stepMeta?.question }}
      </h4>

      <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <button
          v-for="option in stepMeta?.options || []"
          :key="option.value"
          type="button"
          class="group flex min-h-[8.5rem] flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-background/60 px-3 py-5 text-center transition-all duration-200 hover:border-foreground/40 hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          :class="{
            'border-foreground bg-accent/50': stepMeta && answers[stepMeta.key] === option.value,
          }"
          @click="stepMeta && selectOption(stepMeta.key, option.value)"
        >
          <component
            :is="option.icon"
            class="h-7 w-7 text-foreground transition-transform duration-200 group-hover:scale-105"
            stroke-width="1.5"
          />
          <span class="text-sm font-medium leading-snug text-foreground">
            {{ option.label }}
          </span>
        </button>
      </div>
    </div>

    <div v-else-if="step === TOTAL_STEPS" class="space-y-6">
      <div class="flex items-center justify-between gap-4">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          @click="goBack"
        >
          <ArrowLeft class="h-4 w-4" />
          Zurück
        </button>
        <p class="text-sm text-muted-foreground">
          Schritt {{ step }} von {{ TOTAL_STEPS }}
        </p>
      </div>

      <h4 class="text-center text-xl font-semibold tracking-tight text-foreground md:text-2xl">
        Wie können wir Sie erreichen?
      </h4>

      <form class="mx-auto max-w-lg space-y-4" novalidate @submit.prevent="handleSubmit">
        <div>
          <label for="lead-name" class="mb-1.5 block text-sm font-medium text-foreground">
            Name <span class="text-muted-foreground">*</span>
          </label>
          <input
            id="lead-name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            class="input-field"
            :class="{ 'border-destructive/50': errors.name }"
            placeholder="Ihr Name"
          >
          <p v-if="errors.name" class="mt-1 text-xs text-destructive">{{ errors.name }}</p>
        </div>

        <div>
          <label for="lead-email" class="mb-1.5 block text-sm font-medium text-foreground">
            E-Mail <span class="text-muted-foreground">*</span>
          </label>
          <input
            id="lead-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            class="input-field"
            :class="{ 'border-destructive/50': errors.email }"
            placeholder="ihre@email.de"
          >
          <p v-if="errors.email" class="mt-1 text-xs text-destructive">{{ errors.email }}</p>
        </div>

        <div>
          <label for="lead-company" class="mb-1.5 block text-sm font-medium text-foreground">
            Unternehmen <span class="text-muted-foreground">(optional)</span>
          </label>
          <input
            id="lead-company"
            v-model="form.company"
            type="text"
            autocomplete="organization"
            class="input-field"
            placeholder="Ihr Unternehmen"
          >
        </div>

        <div>
          <label for="lead-message" class="mb-1.5 block text-sm font-medium text-foreground">
            Kurzbeschreibung <span class="text-muted-foreground">*</span>
          </label>
          <textarea
            id="lead-message"
            v-model="form.message"
            rows="4"
            class="input-field resize-none"
            :class="{ 'border-destructive/50': errors.message }"
            placeholder="Worum geht es bei Ihrem Projekt?"
          />
          <p v-if="errors.message" class="mt-1 text-xs text-destructive">{{ errors.message }}</p>
        </div>

        <div>
          <label class="flex cursor-pointer items-start gap-3">
            <input
              v-model="form.consent"
              type="checkbox"
              class="mt-1 h-4 w-4 rounded border-border bg-background text-primary focus:ring-ring/30"
            >
            <span class="text-sm leading-relaxed text-muted-foreground">
              Ich stimme der Verarbeitung meiner Daten zum Zweck der Kontaktaufnahme zu.
              <span class="text-foreground">*</span>
            </span>
          </label>
          <p v-if="errors.consent" class="mt-1 text-xs text-destructive">{{ errors.consent }}</p>
        </div>

        <button
          type="submit"
          class="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Wird gesendet…</span>
          <span v-else>Projekt-Check absenden</span>
        </button>

        <p
          v-if="submitStatus === 'error'"
          class="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {{ submitMessage }}
        </p>
      </form>
    </div>

    <div v-else class="py-10 text-center">
      <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted/40">
        <Check class="h-6 w-6 text-foreground" />
      </div>
      <h4 class="text-2xl font-semibold tracking-tight">Anfrage gesendet</h4>
      <p class="mx-auto mt-3 max-w-md text-muted-foreground">
        {{ submitMessage }}
      </p>
    </div>

    <div
      v-if="step <= TOTAL_STEPS"
      class="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-border pt-6 text-xs text-muted-foreground"
    >
      <span class="inline-flex items-center gap-1.5">
        <Lock class="h-3.5 w-3.5" />
        SSL gesichert
      </span>
      <span class="inline-flex items-center gap-1.5">
        <BadgeCheck class="h-3.5 w-3.5" />
        DSGVO-konform
      </span>
      <span class="inline-flex items-center gap-1.5">
        <Check class="h-3.5 w-3.5" />
        Antwort in 24h
      </span>
    </div>
  </div>
</template>
