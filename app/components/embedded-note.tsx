'use client'

import { useEffect, useState } from 'react'
import MDXContent from './mdx-content'
import type { Content } from '@/lib/content-types'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

interface EmbeddedNoteProps {
  slug: string
}

interface EmbeddedContent extends Content {
  content: MDXRemoteSerializeResult
}

export default function EmbeddedNote({ slug }: EmbeddedNoteProps) {
  const [content, setContent] = useState<EmbeddedContent | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch(`/api/content?type=note&slug=${encodeURIComponent(slug)}`)
        if (!response.ok) {
          throw new Error('Failed to fetch content')
        }
        const data = await response.json()
        
        // The API already returns serialized MDX content
        setContent(data)
      } catch (err) {
        setError('Failed to load content')
        console.error('Error loading embedded note:', err)
      }
    }

    loadContent()
  }, [slug])

  if (error) return <div className="text-red-500">{error}</div>
  if (!content) return <div>Loading...</div>

  return (
    <div className="embedded-note border-l-4 border-gray-200 pl-4 my-4">
      <h3 className="font-semibold text-lg mb-2">{content.meta.title}</h3>
      <MDXContent source={content.content} />
    </div>
  )
} 