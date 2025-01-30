import { getNotes, getNote } from '@/app/notes/utils'
import Notes from '@/app/components/notes'
import dynamic from 'next/dynamic'
import { serializeMDX } from '@/lib/mdx'

const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export const metadata = {
  title: 'Internships',
  description: 'Internship opportunities and resources.',
}

export default async function InternshipsPage() {
  const notes = await getNotes()
  const internships = notes.filter(note => note.category === 'internships')
  
  // Get the header content
  const header = await getNote('intern-v1')
  const mdxSource = await serializeMDX(header.content)
  
  return (
    <section className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="font-bold text-3xl mb-2 tracking-tighter">
          {header.title}
        </h1>
        <MDXContent source={mdxSource} />
      </div>

      {internships.length > 0 && (
        <div className="mt-8">
          <Notes notes={internships} />
        </div>
      )}
    </section>
  )
} 