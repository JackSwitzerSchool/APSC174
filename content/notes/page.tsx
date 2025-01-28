import { BlogPosts } from 'app/components/posts' //note: this could be in components/posts.tsx

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