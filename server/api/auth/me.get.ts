import { useAdminSession } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const session = await useAdminSession(event)
  return {
    authenticated: Boolean(session.data.authenticated),
  }
})
