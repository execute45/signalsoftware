<script setup lang="ts">
definePageMeta({
  layout: 'site',
})

type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt: string | null
  createdAt: string | Date
}

const { data: posts, pending } = await useFetch<BlogPost[]>('/api/blog/posts')

usePageSeo({
  title: 'Blog | Signal Software',
  description: 'Einblicke zu Softwareentwicklung, Landingpages und Webentwicklung von Signal Software.',
  path: '/blog',
})

function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'long',
  }).format(new Date(value))
}
</script>

<template>
  <section class="container-site section-padding">
    <div class="max-w-2xl">
      <p class="text-sm text-muted-foreground">Signal Software</p>
      <h1 class="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Blog</h1>
      <p class="mt-4 text-muted-foreground">
        Praxisnahe Beiträge zu Software, Landingpages und Produktentwicklung.
      </p>
    </div>

    <p v-if="pending" class="mt-12 text-sm text-muted-foreground">Laden…</p>
    <p v-else-if="!posts?.length" class="mt-12 text-sm text-muted-foreground">
      Bald erscheinen hier die ersten Beiträge.
    </p>

    <ul v-else class="mt-12 max-w-3xl space-y-8">
      <li v-for="post in posts" :key="post.id">
        <NuxtLink :to="`/blog/${post.slug}`" class="group block">
          <p class="text-sm text-muted-foreground">{{ formatDate(post.createdAt) }}</p>
          <h2 class="mt-2 text-2xl font-semibold tracking-tight transition-colors group-hover:text-muted-foreground">
            {{ post.title }}
          </h2>
          <p v-if="post.excerpt" class="mt-2 text-muted-foreground">
            {{ post.excerpt }}
          </p>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
