import { getBlogPosts } from 'app/notes/utils' //note: this could be in components/posts.tsx

export const baseUrl = 'https://portfolio-blog-starter.vercel.app'

export default async function sitemap() {
  let notes = getBlogPosts().map((post) => ({
    url: `${baseUrl}/notes/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/notes', '/internships', '/tutorials', '/videos', '/onboarding'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...notes]
}
