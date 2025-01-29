import { getNotes } from '@/app/notes/utils'
import { MetadataRoute } from 'next'
import config from '@/lib/config'

interface Note {
  slug: string
  category?: string
  publishedAt?: string
}

function formatDate(date: string | Date | undefined): string {
  if (!date) return new Date().toISOString()
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notes = await getNotes()
  
  // Filter out posts that should have their own routes
  const filteredPosts = notes.filter((note: Note) => {
    // Only include notes and weekly summaries in sitemap
    return note.category === 'notes' || note.category === 'weekly-summary'
  })

  const currentDate = new Date().toISOString()

  return [
    {
      url: config.baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${config.baseUrl}/notes`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${config.baseUrl}/tutorials`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${config.baseUrl}/course-resources`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${config.baseUrl}/internships`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    ...filteredPosts.map((note: Note) => ({
      url: `${config.baseUrl}/notes/${note.slug}`,
      lastModified: formatDate(note.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ]
}
