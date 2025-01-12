import { getBlogPosts } from '@/app/notes/utils'
import { CustomMDX } from '@/app/components/mdx'
import Link from 'next/link'

export default async function Page() {
  const posts = await getBlogPosts()
  console.log('Available posts:', posts.map(p => ({ slug: p.slug, category: p.category })))
  
  const week1Post = posts.find(post => 
    (post.slug === 'week-1' || 
     post.slug === 'week1' ||
     post.slug === 'week 1') && 
    post.category === 'notes'
  )

  if (!week1Post) {
    console.log('Week 1 post not found. Available slugs:', 
      posts.map(p => `${p.category}/${p.slug}`).join(', ')
    )
  }

  return (
    <section>
      <div className="prose prose-neutral dark:prose-invert">
        {week1Post ? (
          <>
            <CustomMDX source={week1Post.content} />
            <div className="mt-8">
              <Link 
                href="/notes" 
                className="text-blue-500 hover:underline"
              >
                View all notes →
              </Link>
            </div>
          </>
        ) : (
          <p>Week 1 content not found. Please check the notes page for available content.</p>
        )}
      </div>
    </section>
  )
}
