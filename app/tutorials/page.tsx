import { getBlogPosts, type BlogPost } from '@/app/notes/utils'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export const metadata = {
  title: 'Tutorials',
  description: 'Course tutorials and practice problems.',
}

export default async function TutorialsPage() {
  try {
    const posts = await getBlogPosts()
    console.log('Available posts:', posts.map(p => ({
      filename: p.originalFilename,
      category: p.category,
      slug: p.slug
    })))
    
    const tutorialHeader = posts.find(
      (post): post is BlogPost => 
        post.originalFilename === 'tutorialsHeader.md' && 
        post.category === 'tutorials'
    )

    console.log('Found tutorial header:', tutorialHeader ? {
      filename: tutorialHeader.originalFilename,
      category: tutorialHeader.category,
      hasContent: !!tutorialHeader.content
    } : 'Not found')

    if (!tutorialHeader?.content) {
      console.error('Tutorial header not found')
      notFound()
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
    notFound()
  }
} 