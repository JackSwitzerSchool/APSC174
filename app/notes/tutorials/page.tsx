import { getBlogPosts, type BlogPost } from '@/app/notes/utils'
import MDXContent from '@/app/components/mdx-content'
import { notFound } from 'next/navigation'

export default async function TutorialsPage() {
  try {
    const posts = await getBlogPosts()
    
    // Look for tutorials header in both tutorials and base directories
    const tutorialHeader = posts.find(
      (post) => 
        (post.slug === 'tutorialsheader' && post.category === 'tutorials') ||
        (post.slug === 'tutorials' && post.category === 'base')
    )

    if (!tutorialHeader?.content) {
      console.log('Tutorial header not found') // Debug log
      return (
        <section>
          <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Tutorials</h1>
          <p>No tutorial content found. Please check back later.</p>
        </section>
      )
    }

    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          {tutorialHeader.metadata?.title || 'Tutorials'}
        </h1>
        <div className="prose prose-neutral dark:prose-invert">
          <MDXContent source={tutorialHeader.content} />
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error in TutorialsPage:', error)
    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Error</h1>
        <p>Failed to load tutorial content. Please try again later.</p>
      </section>
    )
  }
} 