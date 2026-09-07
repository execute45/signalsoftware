import { z } from 'zod'
import { compare } from 'bcryptjs'
import { useAdminSession } from '~~/server/utils/auth'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = loginSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Ungültige Anmeldedaten',
    })
  }

  const config = useRuntimeConfig()
  const { email, password } = parsed.data

  const emailOk = email.toLowerCase() === String(config.adminEmail).toLowerCase()

  let passwordOk = false
  const stored = String(config.adminPassword)
  if (stored.startsWith('$2')) {
    passwordOk = await compare(password, stored)
  }
  else {
    passwordOk = password === stored
  }

  if (!emailOk || !passwordOk) {
    throw createError({
      statusCode: 401,
      statusMessage: 'E-Mail oder Passwort falsch',
    })
  }

  const session = await useAdminSession(event)
  await session.update({ authenticated: true })

  return { success: true }
})
