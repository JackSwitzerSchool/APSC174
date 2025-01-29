import { getNotes } from '@/app/notes/utils'
import Notes from '@/app/components/notes'

export const metadata = {
  title: 'Home',
  description: 'Weekly summaries and course materials.',
}

export default async function HomePage() {
  const allNotes = await getNotes()
  
  // Filter for weekly summaries and sort by week number in reverse order
  const weeklySummaries = allNotes
    .filter(note => note.category === 'weekly-summary')
    .sort((a, b) => {
      const weekA = parseInt(a.slug.replace('week-', '')) || 0
      const weekB = parseInt(b.slug.replace('week-', '')) || 0
      return weekB - weekA // Reverse order
    })
  
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        APSC 174: Linear Algebra for Engineers
      </h1>
      <div className="mb-8">
        <h2 className="font-medium text-xl mb-4 tracking-tighter">Weekly Summaries</h2>
        <Notes notes={weeklySummaries} />
      </div>
    </section>
  )
}
