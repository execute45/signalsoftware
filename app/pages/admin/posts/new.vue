<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const form = reactive({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  published: false,
})

const error = ref('')
const saving = ref(false)
const slugTouched = ref(false)

watch(
  () => form.title,
  (title) => {
    if (!slugTouched.value) {
      form.slug = title
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80)
    }
  },
)

async function save() {
  error.value = ''
  saving.value = true
  try {
    const post = await $fetch<{ id: number }>('/api/admin/posts', {
      method: 'POST',
      body: {
        title: form.title,
        slug: form.slug || undefined,
        excerpt: form.excerpt || undefined,
        content: form.content,
        published: form.published,
      },
    })
    await navigateTo(`/admin/posts/${post.id}`)
  }
  catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string }, statusMessage?: string }
    error.value = err?.data?.statusMessage || err?.statusMessage || 'Speichern fehlgeschlagen'
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl">
    <div class="mb-8">
      <NuxtLink to="/admin/posts" class="text-sm text-muted-foreground hover:text-foreground">
        ← Zurück
      </NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight">Neuer Beitrag</h1>
    </div>

    <form class="space-y-5" @submit.prevent="save">
      <div>
        <label class="mb-1.5 block text-sm font-medium" for="title">Titel</label>
        <input id="title" v-model="form.title" class="input-field" required>
      </div>
      <div>
        <label class="mb-1.5 block text-sm font-medium" for="slug">Slug</label>
        <input
          id="slug"
          v-model="form.slug"
          class="input-field"
          @input="slugTouched = true"
        >
      </div>
      <div>
        <label class="mb-1.5 block text-sm font-medium" for="excerpt">Kurztext</label>
        <input id="excerpt" v-model="form.excerpt" class="input-field" placeholder="Optional">
      </div>
      <div>
        <label class="mb-1.5 block text-sm font-medium" for="content">Inhalt</label>
        <textarea
          id="content"
          v-model="form.content"
          rows="16"
          class="input-field resize-y font-mono text-sm"
          required
        />
      </div>
      <label class="flex items-center gap-3 text-sm">
        <input v-model="form.published" type="checkbox" class="h-4 w-4 rounded border-border">
        Sofort veröffentlichen
      </label>

      <p v-if="error" class="text-sm text-destructive">{{ error }}</p>

      <button
        type="submit"
        class="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
        :disabled="saving"
      >
        {{ saving ? 'Speichern…' : 'Speichern' }}
      </button>
    </form>
  </div>
</template>
