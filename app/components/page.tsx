import { Posts } from '@/app/components/posts'
import { getBlogPosts } from '@/app/notes/utils'

export default async function Page() {
  const posts = await getBlogPosts()
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Course Notes</h1>
      <Posts posts={posts} />
    </section>
  )
} 