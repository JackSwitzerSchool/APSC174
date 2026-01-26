import { getAllCachedNotes } from '@/lib/renderer/cache'
import Link from 'next/link'

// ISR - revalidate every hour
export const revalidate = 3600

export const metadata = {
  title: 'Course Notes',
  description: 'All course notes and materials organized by topic.',
}

// Category configuration with display order
const categoryConfig: Record<string, { title: string; description: string; order: number }> = {
  'set-theory': {
    title: 'Foundations',
    description: 'Sets, notation, and mathematical foundations',
    order: 1
  },
  'functions': {
    title: 'Functions & Mappings',
    description: 'Functions, injectivity, surjectivity, and bijections',
    order: 2
  },
  'vector-spaces': {
    title: 'Vector Spaces',
    description: 'Vector spaces, subspaces, spans, basis, and dimension',
    order: 3
  },
  'matrices': {
    title: 'Matrices',
    description: 'Matrix operations, Gaussian elimination, and RREF',
    order: 4
  },
  'linear-transformations': {
    title: 'Linear Transformations',
    description: 'Transformations, null space, image, and spectral theory',
    order: 5
  },
  'applications': {
    title: 'Applications',
    description: 'Systems of linear equations and practical applications',
    order: 6
  }
}

// Categories to exclude from main listing (they have their own pages)
const excludedCategories = ['course-resources', 'tutorials', 'internships', 'weekly-summary']

interface NoteItem {
  slug: string
  title: string
  category: string
  order?: number
}

function NoteCard({ note }: { note: NoteItem }) {
  return (
    <Link
      href={`/notes/${note.slug}`}
      className="block p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
    >
      <h3 className="font-medium text-sm text-neutral-900 dark:text-neutral-100 truncate">
        {note.title}
      </h3>
    </Link>
  )
}

function CategorySection({
  category,
  notes,
  config
}: {
  category: string
  notes: NoteItem[]
  config?: { title: string; description: string }
}) {
  const title = config?.title || category.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  return (
    <div className="bg-white dark:bg-black rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
      <h2 className="font-semibold text-lg mb-1">{title}</h2>
      {config?.description && (
        <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-5">
          {config.description}
        </p>
      )}
      <div className="space-y-2">
        {notes.map((note) => (
          <NoteCard key={note.slug} note={note} />
        ))}
      </div>
    </div>
  )
}

export default async function NotesPage() {
  const cachedNotes = getAllCachedNotes()

  // Transform and filter notes
  const allNotes: NoteItem[] = cachedNotes
    .filter((n) => n.frontmatter.displayInNotes !== false)
    .map((n) => ({
      slug: n.slug,
      title: n.frontmatter.title,
      category: n.frontmatter.category || 'uncategorized',
      order: n.frontmatter.order,
    }))

  // Separate main notes and weekly summaries
  const mainNotes = allNotes.filter(n => !excludedCategories.includes(n.category))
  const weeklyNotes = allNotes.filter(n => n.category === 'weekly-summary')

  // Group main notes by category
  const notesByCategory = mainNotes.reduce((acc, note) => {
    if (!acc[note.category]) {
      acc[note.category] = []
    }
    acc[note.category].push(note)
    return acc
  }, {} as Record<string, NoteItem[]>)

  // Sort notes within each category
  Object.keys(notesByCategory).forEach((category) => {
    notesByCategory[category].sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order
      }
      return (a.title || '').localeCompare(b.title || '')
    })
  })

  // Sort weekly notes by week number (ascending - Week 1 first)
  weeklyNotes.sort((a, b) => {
    const weekA = parseInt(a.slug.replace('week-', '')) || 0
    const weekB = parseInt(b.slug.replace('week-', '')) || 0
    return weekA - weekB
  })

  // Get sorted categories
  const sortedCategories = Object.keys(notesByCategory)
    .filter(category => notesByCategory[category].length > 0)
    .sort((a, b) => {
      const orderA = categoryConfig[a]?.order ?? 999
      const orderB = categoryConfig[b]?.order ?? 999
      return orderA - orderB
    })

  return (
    <section className="w-full max-w-6xl mx-auto px-4">
      <div className="mb-10">
        <h1 className="font-bold text-3xl mb-2 tracking-tighter">
          Course Notes
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Comprehensive linear algebra notes organized by topic.
        </p>
      </div>

      {/* Main notes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {sortedCategories.map((category) => (
          <CategorySection
            key={category}
            category={category}
            notes={notesByCategory[category]}
            config={categoryConfig[category]}
          />
        ))}
      </div>

      {/* Weekly summaries section */}
      {weeklyNotes.length > 0 && (
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-10">
          <h2 className="font-semibold text-xl mb-2">Weekly Summaries</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-6">
            Week-by-week course coverage and key topics
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {weeklyNotes.map((note) => (
              <Link
                key={note.slug}
                href={`/notes/${note.slug}`}
                className="block py-3 px-4 text-center rounded-lg bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
              >
                <span className="font-medium text-sm text-neutral-900 dark:text-neutral-100">
                  {note.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
