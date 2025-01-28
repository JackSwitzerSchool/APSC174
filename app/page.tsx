import { getNotes } from '@/app/notes/utils'
import Notes from '@/app/components/notes'

export const metadata = {
  title: 'Home',
  description: 'Course notes and materials.',
}

export default async function HomePage() {
  const notes = await getNotes()
  
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        APSC 174: Linear Algebra for Engineers
      </h1>
      <Notes notes={notes} />
    </section>
  )
}
