import { getBlogPosts } from '@/app/notes/utils'
import dynamic from 'next/dynamic'
import { BlogPosts } from '@/app/components/posts'

const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default async function Page() {
  const posts = await getBlogPosts()
  const weeklyPosts = posts
    .filter(post => post.category === 'notes' && post.slug.startsWith('week-'))
    .sort((a, b) => b.slug.localeCompare(a.slug))
    .slice(0, 3) // Only get latest 3 weeks

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        APSC 174: Linear Algebra for Engineers
      </h1>
      
      <div className="prose prose-neutral dark:prose-invert mb-8">
        {weeklyPosts.map(post => (
          <MDXContent key={post.slug} source={post.content} />
        ))}
      </div>
    </section>
  )
}
