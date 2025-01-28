import { getNotes, getNote } from '@/app/notes/utils'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serializeMDX } from '@/lib/mdx'

const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

interface Note {
  slug: string
  title: string
  category?: string
  content?: MDXRemoteSerializeResult
}

interface Props {
  params: {
    slug: string[]
  }
}

export default async function DynamicPage({ params }: Props) {
  if (!params?.slug?.length) {
    notFound()
  }

  try {
    const fullPath = params.slug.join('/')
    const lastSlug = params.slug[params.slug.length - 1].toLowerCase()
    
    const notes = await getNotes()
    const noteMatch = notes.find((note) => {
      const normalizedNoteSlug = note.slug.toLowerCase()
      // Check various path patterns
      return (
        // Direct category/slug match (e.g., /content/notes/vector-spaces)
        (params.slug[0].toLowerCase() === 'content' && 
         note.category === params.slug[1].toLowerCase() && 
         normalizedNoteSlug === lastSlug) ||
        // Legacy direct note match (e.g., /notes/vector-spaces)
        (params.slug[0].toLowerCase() === 'notes' && 
         note.category === 'notes' && 
         normalizedNoteSlug === lastSlug) ||
        // Legacy tutorial match (e.g., /tutorials/week-1)
        (params.slug[0].toLowerCase() === 'tutorials' && 
         note.category === 'tutorials' && 
         normalizedNoteSlug === lastSlug) ||
        // Single slug match for root pages
        (params.slug.length === 1 && normalizedNoteSlug === lastSlug)
      )
    })

    if (!noteMatch) {
      console.error(`Note not found for path: ${fullPath}. Available slugs: ${notes.map(n => n.slug).join(', ')}`)
      notFound()
    }

    // Fetch the full note content
    const fullNote = await getNote(noteMatch.slug)
    const mdxSource = await serializeMDX(fullNote.content)

    return (
      <article>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          {fullNote.title}
        </h1>
        <MDXContent source={mdxSource} />
      </article>
    )
  } catch (error) {
    console.error('Error in DynamicPage:', error)
    notFound()
  }
} 