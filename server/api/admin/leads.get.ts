import { desc } from 'drizzle-orm'
import { db } from '~~/server/database/client'
import { leads } from '~~/server/database/schema'
import { requireAdmin } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const rows = await db
    .select()
    .from(leads)
    .orderBy(desc(leads.createdAt))

  return rows
})
