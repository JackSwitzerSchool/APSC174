import { getNotes } from './utils'
import Notes from '@/app/components/notes'

export const metadata = {
  title: 'Course Notes',
  description: 'All course notes and materials organized by topic.',
}

// Category display names and descriptions
const categories = {
  'foundations': {
    title: 'Foundations',
    description: 'Core mathematical concepts and basic principles'
  },
  'operations': {
    title: 'Operations',
    description: 'Mathematical operations and transformations'
  },
  'functions': {
    title: 'Functions',
    description: 'Function types and their properties'
  },
  'applications': {
    title: 'Applications',
    description: 'Real-world applications and problem solving'
  },
  'weekly-content': {
    title: 'Weekly Content',
    description: 'Course materials organized by week'
  }
}

export default async function NotesPage() {
  const notes = await getNotes()
  
  // Group notes by subcategory
  const notesByCategory = notes.reduce((acc, note) => {
    const category = note.subcategory || 'foundations'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(note)
    return acc
  }, {} as Record<string, typeof notes>)
  
  // Sort notes within each category
  Object.keys(notesByCategory).forEach(category => {
    notesByCategory[category].sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order
      }
      if (a.weight !== undefined && b.weight !== undefined) {
        return a.weight - b.weight
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
          Comprehensive course materials organized by topic and weekly content.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-8">
        {sortedCategories.map((category) => {
          const categoryInfo = categories[category as keyof typeof categories]
          return (
            <div 
              key={category} 
              className="w-full min-w-[min(100%,600px)] mx-auto flex flex-col bg-white dark:bg-black rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <div className="flex flex-col h-full p-5 sm:p-6 lg:p-8">
                <div className="mb-6">
                  <h2 className="font-semibold text-xl mb-3">
                    {categoryInfo?.title || category.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </h2>
                  {categoryInfo?.description && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {categoryInfo.description}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <div className="space-y-2.5">
                    <Notes notes={notesByCategory[category]} />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
} 