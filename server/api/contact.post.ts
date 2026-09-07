import { z } from 'zod'
import { db } from '~~/server/database/client'
import { leads } from '~~/server/database/schema'

const contactSchema = z.object({
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein.'),
  email: z.string().email('Ungültige E-Mail-Adresse.'),
  company: z.string().optional(),
  message: z.string().min(10, 'Nachricht muss mindestens 10 Zeichen lang sein.'),
  projectType: z.string().optional(),
  goal: z.string().optional(),
  timeline: z.string().optional(),
  budget: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const result = contactSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validierungsfehler',
      data: result.error.issues,
    })
  }

  const { name, email, company, message, projectType, goal, timeline, budget } = result.data

  const [lead] = await db
    .insert(leads)
    .values({
      name,
      email,
      company: company || null,
      message,
      projectType: projectType || null,
      goal: goal || null,
      timeline: timeline || null,
      budget: budget || null,
      createdAt: new Date(),
    })
    .returning()

  return { success: true, id: lead?.id }
})
