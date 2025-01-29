import { getNotes, getNote } from '@/app/notes/utils'
import { notFound, redirect } from 'next/navigation'
import dynamic from 'next/dynamic'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serializeMDX } from '@/lib/mdx'
import { NextResponse } from 'next/server'

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

    // Skip handling of static assets entirely since they are served from public
    if (fullPath.includes('assets/')) {
      return NextResponse.next()
    }

    // Handle PDF routes - they are now in public too
    if (fullPath.endsWith('.pdf')) {
      return NextResponse.next()
    }

    const lastSlug = params.slug[params.slug.length - 1].toLowerCase()
    
    const notes = await getNotes()
    const noteMatch = notes.find((note) => {
      const normalizedNoteSlug = note.slug.toLowerCase()
      return normalizedNoteSlug === lastSlug
    })

    if (!noteMatch) {
      console.error(`Note not found for path: ${fullPath}`)
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