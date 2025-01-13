import { getBlogPosts } from '@/app/notes/utils'
import { Posts } from '@/app/components/posts'

export default async function NotesPage() {
  const posts = await getBlogPosts()
  
  // Filter for notes category and sort by date
  const notePosts = posts
    .filter(post => post.category === 'notes')
    .sort((a, b) => 
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
    )

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Course Notes</h1>
      <Posts posts={notePosts} />
    </section>
  )
} 