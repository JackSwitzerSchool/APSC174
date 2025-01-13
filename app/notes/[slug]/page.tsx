import { getBlogPosts, type BlogPost } from '@/app/notes/utils'
import MDXContent from '@/app/components/mdx-content'
import { notFound } from 'next/navigation'

export default async function NotePage({ params }: { params: { slug: string } }) {
  try {
    const posts = await getBlogPosts()
    const post = posts.find(
      (post): post is BlogPost => 
        post.category === 'notes' && post.slug === params.slug
    )

    if (!post?.content?.compiledSource) {
      console.log(`Post not found or invalid for slug: ${params.slug}`)
      notFound()
    }

    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          {post.metadata.title || post.slug}
        </h1>
        <div className="prose prose-neutral dark:prose-invert">
          <MDXContent source={post.content} />
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error in NotePage:', error)
    notFound()
  }
}
