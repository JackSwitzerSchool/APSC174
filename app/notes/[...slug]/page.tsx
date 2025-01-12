import { getBlogPosts } from '@/app/notes/utils'
import { CustomMDX } from '@/app/components/mdx'
import { notFound } from 'next/navigation'

export default async function NotePage({ params }: { params: { slug: string[] } }) {
  const posts = await getBlogPosts()
  
  const slug = decodeURIComponent(params.slug[params.slug.length - 1])
    .toLowerCase()
    .replace(/\s+/g, '-')
  const category = params.slug[0]
  
  const post = posts.find(
    post => post.slug === slug && post.category === category
  )

  if (!post) {
    notFound()
  }

  return (
    <section>
      <div className="prose prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </div>
    </section>
  )
} 