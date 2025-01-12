import { getBlogPosts } from 'app/notes/utils'

export const baseUrl = 'https://jackswitzer.com'

export default async function sitemap() {
  let notes = (await getBlogPosts()).map((post) => ({
    url: `${baseUrl}/notes/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/notes', '/internships', '/tutorials', '/videos', '/onboarding'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...notes]
}
