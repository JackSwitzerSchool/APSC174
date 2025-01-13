import { BlogPosts } from '@/app/components/posts'

export const metadata = {
  title: 'Course Notes',
  description: 'Course notes and learning materials.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Course Notes</h1>
      <BlogPosts />
    </section>
  )
} 