import { getNotes } from './utils'
import Notes from '@/app/components/notes'

export const metadata = {
  title: 'Course Notes',
  description: 'All course notes and materials organized by topic.',
}

// Category display names and descriptions
const categories = {
  'set-theory': {
    title: 'Set Theory',
    description: 'Fundamental concepts of sets, operations, and mathematical notation'
  },
  'functions': {
    title: 'Functions & Mappings',
    description: 'Functions, mappings, and their properties'
  },
  'vector-spaces': {
    title: 'Vector Spaces',
    description: 'Vector spaces, subspaces, linear combinations, and basis'
  },
  'applications': {
    title: 'Applications',
    description: 'Systems of linear equations and practical applications'
  }
}

export default async function NotesPage() {
  const notes = await getNotes()
  
  // Group notes by category instead of subcategory
  const notesByCategory = notes.reduce((acc, note) => {
    const category = note.category || 'uncategorized'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(note)
    return acc
  }, {} as Record<string, typeof notes>)
  
  // Sort notes within each category by order
  Object.keys(notesByCategory).forEach(category => {
    notesByCategory[category].sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order
      }
      return (a.title || '').localeCompare(b.title || '')
    })
  })
  
  // Get categories in the defined order
  const sortedCategories = Object.keys(notesByCategory)
    .filter(category => notesByCategory[category].length > 0)
    .sort((a, b) => {
      const aIndex = Object.keys(categories).indexOf(a)
      const bIndex = Object.keys(categories).indexOf(b)
      if (aIndex === -1 && bIndex === -1) return a.localeCompare(b)
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1
      return aIndex - bIndex
    })
  
  return (
    <section className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="font-bold text-3xl mb-2 tracking-tighter">
          Course Notes
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Comprehensive course materials organized by topic.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {sortedCategories.map((category) => {
          const categoryInfo = categories[category as keyof typeof categories]
          return (
            <div 
              key={category} 
              className="w-full flex flex-col bg-white dark:bg-black rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <div className="flex flex-col h-full p-4 sm:p-5 lg:p-6">
                <div className="mb-4 sm:mb-6">
                  <h2 className="font-semibold text-lg sm:text-xl mb-2 sm:mb-3 truncate">
                    {categoryInfo?.title || category.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </h2>
                  {categoryInfo?.description && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                      {categoryInfo.description}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <Notes notes={notesByCategory[category]} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
} 