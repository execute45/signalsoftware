import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { db } from '~~/server/database/client'
import { posts } from '~~/server/database/schema'
import { requireAdmin, slugify } from '~~/server/utils/auth'

const updateSchema = z.object({
  title: z.string().min(2).optional(),
  slug: z.string().optional(),
  excerpt: z.string().nullable().optional(),
  content: z.string().min(1).optional(),
  published: z.boolean().optional(),
})

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isFinite(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Ungültige ID' })
  }

  const body = await readBody(event)
  const parsed = updateSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validierungsfehler',
      data: parsed.error.issues,
    })
  }

  const [existing] = await db.select().from(posts).where(eq(posts.id, id)).limit(1)
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Beitrag nicht gefunden' })
  }

  const nextSlug = parsed.data.slug !== undefined
    ? slugify(parsed.data.slug)
    : existing.slug

  if (!nextSlug) {
    throw createError({ statusCode: 400, statusMessage: 'Ungültiger Slug' })
  }

  if (nextSlug !== existing.slug) {
    const conflict = await db.select().from(posts).where(eq(posts.slug, nextSlug)).limit(1)
    if (conflict.length) {
      throw createError({ statusCode: 409, statusMessage: 'Slug bereits vergeben' })
    }
  }

  const [post] = await db
    .update(posts)
    .set({
      title: parsed.data.title ?? existing.title,
      slug: nextSlug,
      excerpt: parsed.data.excerpt === undefined ? existing.excerpt : parsed.data.excerpt,
      content: parsed.data.content ?? existing.content,
      published: parsed.data.published ?? existing.published,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, id))
    .returning()

  return post
})
