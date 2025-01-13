import { baseUrl } from '@/app/sitemap'
import { getBlogPosts } from '@/app/notes/utils'

export async function GET() {
  const posts = await getBlogPosts()

  // Filter out posts that are in the tutorials or course-resources categories
  const notePosts = posts.filter(post => 
    post.category === 'notes' && 
    post.slug !== 'tutorials' && 
    post.slug !== 'course-resources'
  )

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>APSC 174</title>
        <link>${baseUrl}</link>
        <description>Linear Algebra for Engineering Applications</description>
        ${notePosts.map(post => `
          <item>
            <title>${post.metadata?.title || post.slug}</title>
            <link>${baseUrl}/notes/${post.slug}</link>
            <description>${post.metadata?.summary || ''}</description>
            ${post.metadata?.publishedAt ? `<pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>` : ''}
          </item>
        `).join('')}
      </channel>
    </rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
