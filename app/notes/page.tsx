import { BlogPosts } from '@/app/components/posts'

export const metadata = {
  title: 'Notes',
  description: 'Course notes and materials.',
}

export default function NotesPage() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Course Notes
      </h1>
      <BlogPosts category="notes" />
    </section>
  )
} 