import { NextResponse } from 'next/server'
import { getContentBySlug, getAllContent, filterContent } from '@/lib/content'
import { ContentNotFoundError, Content, ContentList } from '@/lib/content-types'
import type { ContentFilter } from '@/lib/content-types'
import { serializeMDX } from '@/lib/mdx'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  // If slug is provided, return specific content
  if (slug) {
    try {
      const content = await getContentBySlug(slug)
      // Serialize MDX content before sending
      const serializedContent = {
        ...content,
        content: await serializeMDX(content.content.toString())
      }
      return NextResponse.json(serializedContent)
    } catch (error) {
      if (error instanceof ContentNotFoundError) {
        return NextResponse.json(
          { error: `Content not found: ${slug}` },
          { status: 404 }
        )
      }
      console.error('Error processing content:', error)
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
    let contentItems: Content[];
    // If no filters, return all content
    if (Object.keys(filter).length === 0) {
      const allContent = await getAllContent()
      contentItems = [...allContent.notes, ...allContent.pages]
    } else {
      // Return filtered content
      contentItems = await filterContent(filter)
    }

    // Serialize MDX content for all items
    const serializedContent = await Promise.all(
      contentItems.map(async (item: Content) => ({
        ...item,
        content: await serializeMDX(item.content.toString())
      }))
    )

    return NextResponse.json(serializedContent)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    )
  }
} 