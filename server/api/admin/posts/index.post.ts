import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { db } from '~~/server/database/client'
import { posts } from '~~/server/database/schema'
import { requireAdmin, slugify } from '~~/server/utils/auth'

const createSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  published: z.boolean().optional(),
})

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const body = await readBody(event)
  const parsed = createSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validierungsfehler',
      data: parsed.error.issues,
    })
  }

  const now = new Date()
  const slug = slugify(parsed.data.slug || parsed.data.title)

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Ungültiger Slug',
    })
  }

  const existing = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1)
  if (existing.length) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Slug bereits vergeben',
    })
  }

  const [post] = await db
    .insert(posts)
    .values({
      title: parsed.data.title,
      slug,
      excerpt: parsed.data.excerpt || null,
      content: parsed.data.content,
      published: parsed.data.published ?? false,
      createdAt: now,
      updatedAt: now,
    })
    .returning()

  return post
})
