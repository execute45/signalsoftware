<script setup lang="ts">
const route = useRoute()

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  clearNuxtData('admin-auth')
  await navigateTo('/admin/login')
}

const nav = [
  { to: '/admin', label: 'Leads', exact: true },
  { to: '/admin/posts', label: 'Blog' },
]
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b border-border">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div class="flex items-center gap-8">
          <NuxtLink to="/admin" class="text-sm font-semibold tracking-tight">
            Signal Admin
          </NuxtLink>
          <nav class="flex items-center gap-4">
            <NuxtLink
              v-for="item in nav"
              :key="item.to"
              :to="item.to"
              class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              :class="{
                'text-foreground': item.exact
                  ? route.path === item.to
                  : route.path.startsWith(item.to),
              }"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>
        </div>
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/"
            class="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Zur Website
          </NuxtLink>
          <button
            type="button"
            class="rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            @click="logout"
          >
            Abmelden
          </button>
        </div>
      </div>
    </header>
    <main class="mx-auto max-w-6xl px-6 py-10">
      <slot />
    </main>
  </div>
</template>
