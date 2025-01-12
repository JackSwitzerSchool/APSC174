import { getBlogPosts } from '../../notes/utils'
import { CustomMDX } from '../../components/mdx'
import { notFound } from 'next/navigation'

export default async function BasePage({ params }: { params: { slug: string[] } }) {
  const posts = await getBlogPosts()
  
  const slug = decodeURIComponent(params.slug[params.slug.length - 1])
    .toLowerCase()
    .replace(/\s+/g, '-')
  const category = 'base'
  
  console.log('Base route - Looking for post with slug:', slug, 'and category:', category)
  
  const post = posts.find(
    post => post.slug === slug && post.category === category
  )

  if (!post) {
    console.log('Base route - Post not found. Available posts:', 
      posts.map(p => ({ slug: p.slug, category: p.category })))
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