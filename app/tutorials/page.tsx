import { getNotes } from '@/app/notes/utils'
import Notes from '@/app/components/notes'

export const metadata = {
  title: 'Tutorials',
  description: 'Tutorial materials and practice problems.',
}

export default async function TutorialsPage() {
  const notes = await getNotes()
  const tutorials = notes.filter(note => note.category === 'tutorials')
  
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Tutorials
      </h1>
      <Notes notes={tutorials} />
    </section>
  )
} 