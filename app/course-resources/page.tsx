import { getNotes, getNote } from '@/app/notes/utils'
import Notes from '@/app/components/notes'
import dynamic from 'next/dynamic'
import { serializeMDX } from '@/lib/mdx'

const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export const metadata = {
  title: 'Course Resources',
  description: 'Additional course resources and materials.',
}

export default async function CourseResourcesPage() {
  const notes = await getNotes()
  const resources = notes.filter(note => note.category === 'course-resources')
  
  // Get the header content
  const header = await getNote('course-resources')
  const mdxSource = await serializeMDX(header.content)
  
  return (
    <section className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="font-bold text-3xl mb-2 tracking-tighter">
          {header.title}
        </h1>
        <MDXContent source={mdxSource} />
      </div>

      {resources.length > 0 && (
        <div className="mt-8">
          <Notes notes={resources} />
        </div>
      )}
    </section>
  )
}