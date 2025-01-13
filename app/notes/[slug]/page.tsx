import { getBlogPosts } from '@/app/notes/utils'
import { CustomMDX } from '@/app/components/mdx'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function Page({ params }: PageProps) {
  try {
    const posts = await getBlogPosts()
    
    // Add debug logging
    console.log('Available slugs:', posts.map(p => p.slug))
    console.log('Requested slug:', params.slug)
    
    const post = posts.find((post) => post.slug === params.slug)

    if (!post) {
      console.log(`Post not found for slug: ${params.slug}`)
      notFound()
    }

    // Verify post data before rendering
    if (!post.metadata || !post.content) {
      console.error('Invalid post data:', post)
      throw new Error('Invalid post data structure')
    }

    return (
      <section>
        <h1 className="font-bold text-2xl tracking-tighter max-w-[650px]">
          {post.metadata.title}
        </h1>
        <div className="prose prose-quoteless prose-neutral dark:prose-invert">
          {post.content && <CustomMDX source={post.content} />}
        </div>
      </section>
    )
  } catch (error) {
    console.error(`Error rendering page for slug: ${params.slug}`, error)
    throw error // Let Next.js handle the error
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
