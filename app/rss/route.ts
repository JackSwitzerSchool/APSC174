import { getAllCachedNotes } from '@/lib/renderer/cache'
import config from '@/lib/config'

function formatDate(date: string | Date | undefined): string {
  if (!date) return new Date().toISOString()
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return new Date().toISOString()
    return d.toISOString()
  } catch {
    return new Date().toISOString()
  }
}

export async function GET() {
  const cachedNotes = getAllCachedNotes()

  const feed = `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>${config.title}</title>
    <subtitle>${config.description}</subtitle>
    <link href="${config.baseUrl}/atom" rel="self"/>
    <link href="${config.baseUrl}"/>
    <updated>${new Date().toISOString()}</updated>
    <id>${config.baseUrl}</id>
    ${cachedNotes
      .filter((n) => n.frontmatter.publishedAt)
      .sort((a, b) => {
        const dateA = new Date(a.frontmatter.publishedAt || 0).getTime()
        const dateB = new Date(b.frontmatter.publishedAt || 0).getTime()
        return isNaN(dateB) || isNaN(dateA) ? 0 : dateB - dateA
      })
      .map((n) => `
        <entry>
          <title>${n.frontmatter.title}</title>
          <link href="${config.baseUrl}/notes/${n.slug}"/>
          <updated>${formatDate(n.frontmatter.publishedAt)}</updated>
          <id>${config.baseUrl}/notes/${n.slug}</id>
          <content type="html"><![CDATA[${n.frontmatter.summary || ''}]]></content>
          ${n.frontmatter.tags ? `<category term="${(n.frontmatter.tags as string[]).join(',')}" />` : ''}
        </entry>
      `)
      .join('')}
  </feed>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
