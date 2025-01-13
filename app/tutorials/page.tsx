import { getBlogPosts, type BlogPost } from '@/app/notes/utils'
import { CustomMDX } from '@/app/components/mdx'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Tutorials',
  description: 'Course tutorials and practice problems.',
}

export default async function TutorialsPage() {
  try {
    const posts = await getBlogPosts()
    const tutorialHeader = posts.find(
      (post): post is BlogPost => 
        post.originalFilename === 'tutorialsHeader.md' && 
        post.category === 'tutorials'
    )

    if (!tutorialHeader?.content?.compiledSource) {
      return (
        <section>
          <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Tutorials</h1>
          <div className="prose prose-neutral dark:prose-invert">
            <p>Tutorial content will be available soon.</p>
          </div>
        </section>
      )
    }

    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          {tutorialHeader.metadata.title || 'Tutorials'}
        </h1>
        <div className="prose prose-neutral dark:prose-invert">
          <CustomMDX source={tutorialHeader.content} />
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error in TutorialsPage:', error)
    notFound()
  }
} 