export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return
  if (to.path === '/admin/login') return

  const { data } = await useFetch('/api/auth/me', {
    key: 'admin-auth',
  })

  if (!data.value?.authenticated) {
    return navigateTo('/admin/login')
  }
})
