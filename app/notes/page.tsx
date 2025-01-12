import { getBlogPosts } from './utils'
import { CustomMDX } from '../components/mdx'

export const metadata = {
  title: 'Course Notes',
  description: 'Course notes and learning materials.',
}

export default async function NotesPage() {
  const posts = await getBlogPosts()
  // Note: the slug will be 'week-1' because of the space in the filename
  const week1Post = posts.find(post => post.slug === 'week 1')
  
  console.log('Available posts:', posts.map(p => p.slug)) // Debug log
  
  if (!week1Post) {
    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Course Notes</h1>
        <p>Week 1 content not found</p>
      </section>
    )
  }

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Course Notes</h1>
      <div className="prose dark:prose-invert">
        <CustomMDX source={week1Post.content} />
      </div>
    </section>
  )
} 