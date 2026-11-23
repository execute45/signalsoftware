import { eq } from 'drizzle-orm'
import { db } from '~~/server/database/client'
import { posts } from '~~/server/database/schema'

export default defineSitemapEventHandler(async () => {
  const published = await db
    .select({
      slug: posts.slug,
      updatedAt: posts.updatedAt,
    })
    .from(posts)
    .where(eq(posts.published, true))

  return published.map((post) => ({
    loc: `/blog/${post.slug}`,
    lastmod: post.updatedAt,
  }))
})
