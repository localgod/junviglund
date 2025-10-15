import type { Post } from '~/types/sanity'

export default defineEventHandler(async (): Promise<Post[]> => {
  try {
    const client = getSanityClient()
    return await client.fetch<Post[]>('*[_type == "post"] | order(_createdAt desc)')
  } catch (error) {
    console.error('Failed to fetch posts from Sanity:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch blog posts'
    })
  }
})
