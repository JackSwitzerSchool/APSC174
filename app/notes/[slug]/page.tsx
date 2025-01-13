import { getBlogPosts, type BlogPost } from '@/app/notes/utils'
import { CustomMDX } from '@/app/components/mdx'
import { notFound } from 'next/navigation'

export default async function NotePage({ params }: { params: { slug: string } }) {
  const posts = await getBlogPosts()
  const post = posts.find(
    (post): post is BlogPost => 
      post.category === 'notes' && post.slug === params.slug
  )

  if (!post?.content) {
    notFound()
  }

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="prose prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </div>
    </section>
  )
}
