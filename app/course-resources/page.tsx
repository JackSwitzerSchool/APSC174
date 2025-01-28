import { getNotes } from '@/app/notes/utils'
import Notes from '@/app/components/notes'

export const metadata = {
  title: 'Course Resources',
  description: 'Additional course resources and materials.',
}

export default async function CourseResourcesPage() {
  const notes = await getNotes()
  const resources = notes.filter(note => note.category === 'resources')
  
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Course Resources
      </h1>
      <Notes notes={resources} />
    </section>
  )
}