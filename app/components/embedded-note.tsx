'use client'

import { useEffect, useState } from 'react'
import MDXContent from './mdx-content'
import { getBlogPosts } from '@/app/notes/utils'

interface EmbeddedNoteProps {
  slug: string
}

export default function EmbeddedNote({ slug }: EmbeddedNoteProps) {
  const [content, setContent] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadContent() {
      try {
        const posts = await getBlogPosts()
        const post = posts.find(p => p.slug === slug)
        if (post?.content) {
          setContent(post.content)
        } else {
          setError(`Note "${slug}" not found`)
        }
      } catch (err) {
        setError('Failed to load note content')
      }
    }

    loadContent()
  }, [slug])

  if (error) return <div className="text-red-500">{error}</div>
  if (!content) return <div>Loading...</div>

  return (
    <div className="embedded-note border-l-4 border-gray-200 pl-4 my-4">
      <MDXContent source={content} />
    </div>
  )
} 