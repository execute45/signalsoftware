<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

type Lead = {
  id: number
  name: string
  email: string
  company: string | null
  message: string
  projectType: string | null
  goal: string | null
  timeline: string | null
  budget: string | null
  createdAt: string | Date
}

const { data: leads, pending, error, refresh } = await useFetch<Lead[]>('/api/admin/leads')

const selected = ref<Lead | null>(null)

function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}
</script>

<template>
  <div>
    <div class="mb-8 flex items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-semibold tracking-tight">Leads</h1>
        <p class="mt-2 text-sm text-muted-foreground">
          Anfragen aus dem Projekt-Check
        </p>
      </div>
      <button
        type="button"
        class="rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
        @click="refresh()"
      >
        Aktualisieren
      </button>
    </div>

    <p v-if="pending" class="text-sm text-muted-foreground">Laden…</p>
    <p v-else-if="error" class="text-sm text-destructive">Leads konnten nicht geladen werden.</p>
    <p v-else-if="!leads?.length" class="text-sm text-muted-foreground">
      Noch keine Leads vorhanden.
    </p>

    <div v-else class="overflow-hidden rounded-xl border border-border">
      <table class="w-full text-left text-sm">
        <thead class="border-b border-border bg-muted/40 text-muted-foreground">
          <tr>
            <th class="px-4 py-3 font-medium">Name</th>
            <th class="hidden px-4 py-3 font-medium md:table-cell">E-Mail</th>
            <th class="hidden px-4 py-3 font-medium lg:table-cell">Projekt</th>
            <th class="px-4 py-3 font-medium">Datum</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="lead in leads"
            :key="lead.id"
            class="cursor-pointer border-b border-border last:border-0 hover:bg-accent/40"
            @click="selected = lead"
          >
            <td class="px-4 py-3 font-medium">{{ lead.name }}</td>
            <td class="hidden px-4 py-3 md:table-cell">{{ lead.email }}</td>
            <td class="hidden px-4 py-3 text-muted-foreground lg:table-cell">
              {{ lead.projectType || '-' }}
            </td>
            <td class="px-4 py-3 text-muted-foreground">
              {{ formatDate(lead.createdAt) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="selected"
      class="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
      @click.self="selected = null"
    >
      <div class="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
        <div class="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 class="text-xl font-semibold">{{ selected.name }}</h2>
            <p class="mt-1 text-sm text-muted-foreground">
              {{ formatDate(selected.createdAt) }}
            </p>
          </div>
          <button
            type="button"
            class="text-sm text-muted-foreground hover:text-foreground"
            @click="selected = null"
          >
            Schließen
          </button>
        </div>
        <dl class="space-y-3 text-sm">
          <div>
            <dt class="text-muted-foreground">E-Mail</dt>
            <dd>
              <a :href="`mailto:${selected.email}`" class="hover:underline">
                {{ selected.email }}
              </a>
            </dd>
          </div>
          <div v-if="selected.company">
            <dt class="text-muted-foreground">Unternehmen</dt>
            <dd>{{ selected.company }}</dd>
          </div>
          <div v-if="selected.projectType">
            <dt class="text-muted-foreground">Projektart</dt>
            <dd>{{ selected.projectType }}</dd>
          </div>
          <div v-if="selected.goal">
            <dt class="text-muted-foreground">Ziel</dt>
            <dd>{{ selected.goal }}</dd>
          </div>
          <div v-if="selected.timeline">
            <dt class="text-muted-foreground">Zeitrahmen</dt>
            <dd>{{ selected.timeline }}</dd>
          </div>
          <div v-if="selected.budget">
            <dt class="text-muted-foreground">Budget</dt>
            <dd>{{ selected.budget }}</dd>
          </div>
          <div>
            <dt class="text-muted-foreground">Nachricht</dt>
            <dd class="mt-1 whitespace-pre-wrap rounded-lg bg-muted/40 p-3">
              {{ selected.message }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
