<script setup lang="ts">
definePageMeta({
  layout: 'site',
})

const route = useRoute()
const slug = computed(() => String(route.params.slug))

type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string
  createdAt: string | Date
}

const { data: post, error } = await useFetch<BlogPost>(() => `/api/blog/posts/${slug.value}`)

if (error.value || !post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Beitrag nicht gefunden',
  })
}

const canonicalPath = `/blog/${post.value.slug}`
const description = post.value.excerpt || post.value.title

usePageSeo({
  title: `${post.value.title} | Signal Software`,
  description,
  path: canonicalPath,
  type: 'article',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.value.title,
        description,
        datePublished: new Date(post.value.createdAt).toISOString(),
        dateModified: new Date(post.value.createdAt).toISOString(),
        mainEntityOfPage: `https://signalsoftware.de${canonicalPath}`,
        author: {
          '@type': 'Organization',
          name: 'Signal Software',
          url: 'https://signalsoftware.de',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Signal Software',
          logo: {
            '@type': 'ImageObject',
            url: 'https://signalsoftware.de/logo.png',
          },
        },
      }),
    },
  ],
})

function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'long',
  }).format(new Date(value))
}
</script>

<template>
  <article class="container-site section-padding">
    <div class="mx-auto max-w-2xl">
      <NuxtLink to="/blog" class="text-sm text-muted-foreground hover:text-foreground">
        ← Alle Beiträge
      </NuxtLink>
      <p class="mt-8 text-sm text-muted-foreground">
        {{ formatDate(post!.createdAt) }}
      </p>
      <h1 class="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
        {{ post!.title }}
      </h1>
      <p v-if="post!.excerpt" class="mt-4 text-lg text-muted-foreground">
        {{ post!.excerpt }}
      </p>
      <div class="prose-blog mt-10 whitespace-pre-wrap text-base leading-relaxed text-foreground/90">
        {{ post!.content }}
      </div>
    </div>
  </article>
</template>
