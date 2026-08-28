<script setup lang="ts">
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Bitte geben Sie Ihren Namen ein (mind. 2 Zeichen).'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
  company: z.string().optional(),
  message: z.string().min(10, 'Ihre Nachricht sollte mindestens 10 Zeichen lang sein.'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Bitte stimmen Sie der Datenverarbeitung zu.' }),
  }),
})

type FormState = {
  name: string
  email: string
  company: string
  message: string
  consent: boolean
}

const form = reactive<FormState>({
  name: '',
  email: '',
  company: '',
  message: '',
  consent: false,
})

const errors = reactive<Partial<Record<keyof FormState, string>>>({})
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const submitMessage = ref('')

function validateForm(): boolean {
  Object.keys(errors).forEach((key) => {
    delete errors[key as keyof FormState]
  })

  const result = contactSchema.safeParse(form)
  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof FormState
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

  if (!validateForm()) return

  isSubmitting.value = true

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        company: form.company || undefined,
        message: form.message,
      },
    })

    submitStatus.value = 'success'
    submitMessage.value = 'Vielen Dank! Wir melden uns in Kürze bei Ihnen.'

    form.name = ''
    form.email = ''
    form.company = ''
    form.message = ''
    form.consent = false
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
  <form class="space-y-5" novalidate @submit.prevent="handleSubmit">
    <div>
      <label for="name" class="mb-1.5 block text-sm font-medium text-foreground">
        Name <span class="text-muted-foreground">*</span>
      </label>
      <input
        id="name"
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
      <label for="email" class="mb-1.5 block text-sm font-medium text-foreground">
        E-Mail <span class="text-muted-foreground">*</span>
      </label>
      <input
        id="email"
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
      <label for="company" class="mb-1.5 block text-sm font-medium text-foreground">
        Unternehmen <span class="text-muted-foreground">(optional)</span>
      </label>
      <input
        id="company"
        v-model="form.company"
        type="text"
        autocomplete="organization"
        class="input-field"
        placeholder="Ihr Unternehmen"
      >
    </div>

    <div>
      <label for="message" class="mb-1.5 block text-sm font-medium text-foreground">
        Nachricht <span class="text-muted-foreground">*</span>
      </label>
      <textarea
        id="message"
        v-model="form.message"
        rows="4"
        class="input-field resize-none"
        :class="{ 'border-destructive/50': errors.message }"
        placeholder="Erzählen Sie uns von Ihrem Projekt..."
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
          Weitere Informationen finden Sie in unserer Datenschutzerklärung.
          <span class="text-foreground">*</span>
        </span>
      </label>
      <p v-if="errors.consent" class="mt-1 text-xs text-destructive">{{ errors.consent }}</p>
    </div>

    <UiBaseButton
      type="submit"
      variant="primary"
      :disabled="isSubmitting"
      class="w-full"
    >
      <span v-if="isSubmitting">Wird gesendet...</span>
      <span v-else>Nachricht senden</span>
    </UiBaseButton>

    <p
      v-if="submitStatus === 'success'"
      class="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground"
      role="status"
    >
      {{ submitMessage }}
    </p>
    <p
      v-if="submitStatus === 'error'"
      class="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
      role="alert"
    >
      {{ submitMessage }}
    </p>
  </form>
</template>
