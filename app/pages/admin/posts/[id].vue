<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const route = useRoute()
const id = computed(() => String(route.params.id))

type Post = {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string
  published: boolean
}

const { data: post, error: loadError } = await useFetch<Post>(() => `/api/admin/posts/${id.value}`)

const form = reactive({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  published: false,
})

watch(
  post,
  (value) => {
    if (!value) return
    form.title = value.title
    form.slug = value.slug
    form.excerpt = value.excerpt || ''
    form.content = value.content
    form.published = value.published
  },
  { immediate: true },
)

const error = ref('')
const saving = ref(false)
const saved = ref(false)

async function save() {
  error.value = ''
  saved.value = false
  saving.value = true
  try {
    await $fetch(`/api/admin/posts/${id.value}`, {
      method: 'PUT',
      body: {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt || null,
        content: form.content,
        published: form.published,
      },
    })
    saved.value = true
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
      <h1 class="mt-3 text-3xl font-semibold tracking-tight">Beitrag bearbeiten</h1>
    </div>

    <p v-if="loadError" class="text-sm text-destructive">Beitrag nicht gefunden.</p>

    <form v-else class="space-y-5" @submit.prevent="save">
      <div>
        <label class="mb-1.5 block text-sm font-medium" for="title">Titel</label>
        <input id="title" v-model="form.title" class="input-field" required>
      </div>
      <div>
        <label class="mb-1.5 block text-sm font-medium" for="slug">Slug</label>
        <input id="slug" v-model="form.slug" class="input-field" required>
      </div>
      <div>
        <label class="mb-1.5 block text-sm font-medium" for="excerpt">Kurztext</label>
        <input id="excerpt" v-model="form.excerpt" class="input-field">
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
        Veröffentlicht
      </label>

      <p v-if="error" class="text-sm text-destructive">{{ error }}</p>
      <p v-if="saved" class="text-sm text-emerald-300">Gespeichert.</p>

      <div class="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          class="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
          :disabled="saving"
        >
          {{ saving ? 'Speichern…' : 'Speichern' }}
        </button>
        <NuxtLink
          v-if="form.published && form.slug"
          :to="`/blog/${form.slug}`"
          class="text-sm text-muted-foreground hover:text-foreground"
          target="_blank"
        >
          Öffentliche Ansicht
        </NuxtLink>
      </div>
    </form>
  </div>
</template>
