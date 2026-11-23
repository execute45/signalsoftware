<script setup lang="ts">
definePageMeta({
  layout: false,
})

useSeoMeta({
  robots: 'noindex, nofollow',
})

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const { data: me } = await useFetch('/api/auth/me', { key: 'admin-auth' })
if (me.value?.authenticated) {
  await navigateTo('/admin')
}

async function login() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    })
    clearNuxtData('admin-auth')
    await navigateTo('/admin')
  }
  catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string }, statusMessage?: string }
    error.value = err?.data?.statusMessage || err?.statusMessage || 'Anmeldung fehlgeschlagen'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-background px-6">
    <div class="w-full max-w-md space-y-8">
      <div>
        <p class="text-sm text-muted-foreground">Signal Software</p>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight">Admin Login</h1>
      </div>

      <form class="space-y-4" @submit.prevent="login">
        <div>
          <label for="email" class="mb-1.5 block text-sm font-medium">E-Mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="username"
            class="input-field"
            required
          >
        </div>
        <div>
          <label for="password" class="mb-1.5 block text-sm font-medium">Passwort</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            class="input-field"
            required
          >
        </div>

        <p v-if="error" class="text-sm text-destructive">{{ error }}</p>

        <button
          type="submit"
          class="w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? 'Anmelden…' : 'Anmelden' }}
        </button>
      </form>
    </div>
  </div>
</template>
