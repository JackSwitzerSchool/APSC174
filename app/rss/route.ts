import { getNotes } from '@/app/notes/utils'
import config from '@/lib/config'

function formatDate(date: string | Date): string {
  try {
    const d = new Date(date)
    // Check if date is valid
    if (isNaN(d.getTime())) {
      return new Date().toISOString()
    }
    return d.toISOString()
  } catch {
    return new Date().toISOString()
  }
}

export async function GET() {
  const notes = await getNotes()
  const feed = `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>${config.title}</title>
    <subtitle>${config.description}</subtitle>
    <link href="${config.baseUrl}/atom" rel="self"/>
    <link href="${config.baseUrl}"/>
    <updated>${new Date().toISOString()}</updated>
    <id>${config.baseUrl}</id>
    ${notes
      .filter(note => note.category === 'notes' || note.category === 'weekly-summary')
      .filter(note => note.publishedAt) // Only include notes with valid publishedAt
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime()
        const dateB = new Date(b.publishedAt).getTime()
        return isNaN(dateB) || isNaN(dateA) ? 0 : dateB - dateA
      })
      .map((note) => `
        <entry>
          <title>${note.title}</title>
          <link href="${config.baseUrl}/notes/${note.slug}"/>
          <updated>${formatDate(note.publishedAt)}</updated>
          <id>${config.baseUrl}/notes/${note.slug}</id>
          <content type="html"><![CDATA[${note.summary || ''}]]></content>
          ${note.tags ? `<category term="${note.tags.join(',')}" />` : ''}
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
