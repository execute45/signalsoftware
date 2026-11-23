const SITE_URL = 'https://signalsoftware.de'
const OG_IMAGE = `${SITE_URL}/og.png`

export function usePageSeo(options: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
}) {
  const url = options.path === '/' ? SITE_URL : `${SITE_URL}${options.path}`

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogType: options.type ?? 'website',
    ogUrl: url,
    ogImage: OG_IMAGE,
    ogLocale: 'de_DE',
    ogSiteName: 'Signal Software',
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: OG_IMAGE,
  })

  useHead({
    link: [{ rel: 'canonical', href: url }],
  })

  return { url }
}
