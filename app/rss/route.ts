import { baseUrl } from '@/app/sitemap'
import { getBlogPosts } from '@/app/notes/utils'
import RSS from 'rss'

export async function GET() {
  const posts = await getBlogPosts()

  const feed = new RSS({
    title: 'APSC 174',
    description: 'Linear Algebra for Engineering Applications',
    site_url: baseUrl,
    feed_url: `${baseUrl}/feed.xml`,
  })

  // Filter out reserved routes from notes
  const reservedRoutes = ['tutorials', 'course-resources']
  const notePosts = posts.filter(post => 
    post.category === 'notes' && 
    !reservedRoutes.includes(post.slug)
  )

  notePosts.forEach((post) => {
    feed.item({
      title: post.metadata?.title || post.slug,
      url: `${baseUrl}/notes/${post.slug}`,
      date: post.metadata?.publishedAt,
      description: post.metadata?.summary || '',
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
