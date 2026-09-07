import { eq } from 'drizzle-orm'
import { db } from '~~/server/database/client'
import { posts } from '~~/server/database/schema'
import { requireAdmin } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isFinite(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Ungültige ID' })
  }

  const deleted = await db.delete(posts).where(eq(posts.id, id)).returning()
  if (!deleted.length) {
    throw createError({ statusCode: 404, statusMessage: 'Beitrag nicht gefunden' })
  }

  return { success: true }
})
