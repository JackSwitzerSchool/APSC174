import { getNotes } from './utils'
import Notes from '@/app/components/notes'

export const metadata = {
  title: 'Course Notes',
  description: 'All course notes and materials organized by topic.',
}

// Category display names
const categoryDisplayNames: Record<string, string> = {
  'foundations': 'Foundations',
  'operations': 'Operations',
  'functions': 'Functions',
  'applications': 'Applications',
  'weekly-content': 'Weekly Content'
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
      // First sort by order if available
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order
      }
      // Then by weight if available
      if (a.weight !== undefined && b.weight !== undefined) {
        return a.weight - b.weight
      }
      // Finally by title
      return (a.title || '').localeCompare(b.title || '')
    })
  })
  
  // Get categories in the defined order
  const sortedCategories = Object.keys(notesByCategory)
    .filter(category => notesByCategory[category].length > 0) // Only show categories with notes
    .sort((a, b) => {
      const aIndex = Object.keys(categoryDisplayNames).indexOf(a)
      const bIndex = Object.keys(categoryDisplayNames).indexOf(b)
      if (aIndex === -1 && bIndex === -1) return a.localeCompare(b)
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1
      return aIndex - bIndex
    })
  
  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Course Notes
      </h1>
      <div className="grid gap-8">
        {sortedCategories.map((category) => (
          <div key={category} className="space-y-4">
            <h2 className="font-medium text-xl tracking-tighter">
              {categoryDisplayNames[category] || category.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </h2>
            <div className="pl-4 border-l-2 border-neutral-200 dark:border-neutral-800">
              <Notes notes={notesByCategory[category]} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 