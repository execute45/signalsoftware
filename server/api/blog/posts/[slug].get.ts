import { and, eq } from 'drizzle-orm'
import { db } from '~~/server/database/client'
import { posts } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug fehlt' })
  }

  const [post] = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.published, true)))
    .limit(1)

  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Beitrag nicht gefunden' })
  }

  return post
})
