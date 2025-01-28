import { getNotes } from '@/app/notes/utils'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

interface Note {
  slug: string
  title: string
  category?: string
  content?: MDXRemoteSerializeResult
  metadata?: {
    title?: string
  }
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
    const lastSlug = params.slug[params.slug.length - 1]
    
    const notes = await getNotes()
    const note = notes.find((note): note is Note => {
      // Check various path patterns
      return (
        // Direct category/slug match (e.g., /content/notes/vector-spaces)
        (params.slug[0] === 'content' && note.category === params.slug[1] && note.slug === lastSlug) ||
        // Legacy direct note match (e.g., /notes/vector-spaces)
        (params.slug[0] === 'notes' && note.category === 'notes' && note.slug === lastSlug) ||
        // Legacy tutorial match (e.g., /tutorials/week-1)
        (params.slug[0] === 'tutorials' && note.category === 'tutorials' && note.slug === lastSlug) ||
        // Single slug match for root pages
        (params.slug.length === 1 && note.slug === params.slug[0])
      )
    })

    if (!note?.content) {
      console.error(`Note not found for path: ${fullPath}`)
      notFound()
    }

    return (
      <article>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          {note.metadata?.title || note.title}
        </h1>
        <div className="prose prose-neutral dark:prose-invert">
          <MDXContent source={note.content} />
        </div>
      </article>
    )
  } catch (error) {
    console.error('Error in DynamicPage:', error)
    notFound()
  }
} 