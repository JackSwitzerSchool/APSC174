import { getNotes } from '@/app/notes/utils'

const baseUrl = 'https://jackswitzer.com'

export async function GET() {
  const notes = await getNotes()
  const feed = `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>APSC 174 Notes</title>
    <subtitle>Course notes and materials for APSC 174: Linear Algebra for Engineers</subtitle>
    <link href="${baseUrl}/atom" rel="self"/>
    <link href="${baseUrl}"/>
    <updated>${new Date().toISOString()}</updated>
    <id>${baseUrl}</id>
    ${notes
      .filter(note => note.category === 'notes' || note.category === 'weekly-summary')
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .map((note) => `
        <entry>
          <title>${note.title}</title>
          <link href="${baseUrl}/notes/${note.slug}"/>
          <updated>${new Date(note.publishedAt).toISOString()}</updated>
          <id>${baseUrl}/notes/${note.slug}</id>
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
