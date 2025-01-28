import { getNotes } from '@/app/notes/utils'

export async function GET() {
  const notes = await getNotes()
  const feed = `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>APSC 174 Notes</title>
    <subtitle>Course notes and materials for APSC 174: Linear Algebra for Engineers</subtitle>
    <link href="https://apsc174.vercel.app/atom" rel="self"/>
    <link href="https://apsc174.vercel.app"/>
    <updated>${new Date().toISOString()}</updated>
    <id>https://apsc174.vercel.app</id>
    ${notes
      .map((note) => `
        <entry>
          <title>${note.title}</title>
          <link href="https://apsc174.vercel.app/notes/${note.slug}"/>
          <updated>${new Date().toISOString()}</updated>
          <id>https://apsc174.vercel.app/notes/${note.slug}</id>
          <content type="html"><![CDATA[${note.description || ''}]]></content>
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
