import { getBlogPosts } from './notes/utils'
import { MetadataRoute } from 'next'

export const baseUrl = 'https://apsc174.jackswitzer.ca'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts()
  
  // Filter out reserved routes from notes
  const reservedRoutes = ['tutorials', 'course-resources']
  const notePosts = posts.filter(post => 
    post.category === 'notes' && 
    !reservedRoutes.includes(post.slug)
  )

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tutorials`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/course-resources`,
      lastModified: new Date(),
    },
    ...notePosts.map((post) => ({
      url: `${baseUrl}/notes/${post.slug}`,
      lastModified: new Date(),
    })),
  ]
}
