import type { H3Event } from 'h3'
import { createError, useSession } from 'h3'

export type AdminSessionData = {
  authenticated?: boolean
}

function getSessionPassword() {
  const password = useRuntimeConfig().sessionPassword
  if (!password || String(password).length < 32) {
    throw createError({
      statusCode: 500,
      statusMessage: 'NUXT_SESSION_PASSWORD muss mindestens 32 Zeichen lang sein.',
    })
  }
  return String(password)
}

export async function useAdminSession(event: H3Event) {
  return useSession<AdminSessionData>(event, {
    name: 'signal-admin',
    password: getSessionPassword(),
    maxAge: 60 * 60 * 24 * 7,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  })
}

export async function requireAdmin(event: H3Event) {
  const session = await useAdminSession(event)
  if (!session.data.authenticated) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Nicht autorisiert',
    })
  }
  return session
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}
