import { desc, eq } from 'drizzle-orm'
import { db } from '~~/server/database/client'
import { posts } from '~~/server/database/schema'

export default defineEventHandler(async () => {
  return db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      published: posts.published,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
    })
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
})