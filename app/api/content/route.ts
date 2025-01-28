import { NextResponse } from 'next/server'
import { getContentBySlug, getAllContent, filterContent } from '@/lib/content'
import { ContentNotFoundError } from '@/lib/content-types'
import type { ContentFilter } from '@/lib/content-types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  // If slug is provided, return specific content
  if (slug) {
    try {
      const content = await getContentBySlug(slug)
      return NextResponse.json(content)
    } catch (error) {
      if (error instanceof ContentNotFoundError) {
        return NextResponse.json(
          { error: `Content not found: ${slug}` },
          { status: 404 }
        )
      }
      return NextResponse.json(
        { error: 'Failed to fetch content' },
        { status: 500 }
      )
    }
  }

  // Handle filtering
  const filter: ContentFilter = {}
  
  const type = searchParams.get('type')
  if (type) filter.type = type as any
  
  const tags = searchParams.get('tags')
  if (tags) filter.tags = tags.split(',')
  
  const category = searchParams.get('category')
  if (category) filter.category = category
  
  const displayInNotes = searchParams.get('displayInNotes')
  if (displayInNotes) filter.displayInNotes = displayInNotes === 'true'

  try {
    // If no filters, return all content
    if (Object.keys(filter).length === 0) {
      const content = await getAllContent()
      return NextResponse.json(content)
    }

    // Return filtered content
    const content = await filterContent(filter)
    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    )
  }
} 