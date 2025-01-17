import { getBlogPosts } from '@/app/notes/utils'
import dynamic from 'next/dynamic'
import { BlogPosts } from '@/app/components/posts'

const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default async function Page() {
  const posts = await getBlogPosts()
  const week1Post = posts.find(
    post => post.category === 'notes' && post.slug === 'week-1'
  )

  if (!week1Post?.content) {
    throw new Error('Week 1 content not found')
  }

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        APSC 174: Linear Algebra for Engineers
      </h1>
      
      <div className="prose prose-neutral dark:prose-invert mb-8">
        <MDXContent source={week1Post.content} />
      </div>

      <h2 className="font-semibold text-xl mb-4 tracking-tighter">
        All Course Materials
      </h2>
      <BlogPosts />
    </section>
  )
}
