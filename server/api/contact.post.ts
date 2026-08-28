import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein.'),
  email: z.string().email('Ungültige E-Mail-Adresse.'),
  company: z.string().optional(),
  message: z.string().min(10, 'Nachricht muss mindestens 10 Zeichen lang sein.'),
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

  const { name, email, company, message } = result.data

  // Phase 1: Log contact request (Phase 2: send via SMTP/Resend)
  console.log('[Contact Request]', {
    name,
    email,
    company: company || '-',
    message,
    timestamp: new Date().toISOString(),
  })

  return { success: true }
})
