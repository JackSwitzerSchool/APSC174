import { getBlogPosts } from './notes/utils'
import { MetadataRoute } from 'next'

export const baseUrl = 'https://apsc174.jackswitzer.ca'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts()
  
  // Filter out posts that should have their own routes
  const filteredPosts = posts.filter(post => {
    if (post.category === 'tutorials' || 
        (post.category === 'base' && post.slug === 'course-resources')) {
      return false
    }
    return true
  })

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
    ...filteredPosts.map((post) => ({
      url: `${baseUrl}/notes/${post.slug}`,
      lastModified: new Date(),
    })),
  ]
}
