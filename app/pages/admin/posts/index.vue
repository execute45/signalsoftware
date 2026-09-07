<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

type Post = {
  id: number
  title: string
  slug: string
  excerpt: string | null
  published: boolean
  createdAt: string | Date
  updatedAt: string | Date
}

const { data: posts, pending, error, refresh } = await useFetch<Post[]>('/api/admin/posts')

function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'medium',
  }).format(new Date(value))
}

async function removePost(post: Post) {
  if (!confirm(`Beitrag „${post.title}“ wirklich löschen?`)) return
  await $fetch(`/api/admin/posts/${post.id}`, { method: 'DELETE' })
  await refresh()
}
</script>

<template>
  <div>
    <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-semibold tracking-tight">Blog</h1>
        <p class="mt-2 text-sm text-muted-foreground">
          Beiträge erstellen und veröffentlichen
        </p>
      </div>
      <NuxtLink
        to="/admin/posts/new"
        class="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
      >
        Neuer Beitrag
      </NuxtLink>
    </div>

    <p v-if="pending" class="text-sm text-muted-foreground">Laden…</p>
    <p v-else-if="error" class="text-sm text-destructive">Beiträge konnten nicht geladen werden.</p>
    <p v-else-if="!posts?.length" class="text-sm text-muted-foreground">
      Noch keine Beiträge. Erstelle den ersten.
    </p>

    <ul v-else class="divide-y divide-border rounded-xl border border-border">
      <li
        v-for="post in posts"
        :key="post.id"
        class="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <h2 class="font-medium">{{ post.title }}</h2>
            <span
              class="rounded-full px-2 py-0.5 text-xs"
              :class="post.published
                ? 'bg-emerald-500/15 text-emerald-300'
                : 'bg-muted text-muted-foreground'"
            >
              {{ post.published ? 'Veröffentlicht' : 'Entwurf' }}
            </span>
          </div>
          <p class="mt-1 text-sm text-muted-foreground">
            /blog/{{ post.slug }} · {{ formatDate(post.updatedAt) }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <NuxtLink
            :to="`/admin/posts/${post.id}`"
            class="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-accent"
          >
            Bearbeiten
          </NuxtLink>
          <button
            type="button"
            class="rounded-lg border border-border px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10"
            @click="removePost(post)"
          >
            Löschen
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
