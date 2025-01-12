import { getBlogPosts } from '../notes/utils'
import { CustomMDX } from '../components/mdx'
import { ErrorBoundary } from '../components/error-boundary'

export const metadata = {
  title: 'Tutorials',
  description: 'Course tutorials and practice problems.',
}

export default function TutorialsPage() {
  const posts = getBlogPosts()
  console.log('All posts:', posts.map(p => p.slug)) // Debug logging
  
  const tutorialPost = posts.find(post => post.slug === 'tutorials')
  console.log('Tutorial post:', tutorialPost) // Debug logging
  
  if (!tutorialPost) {
    console.error('Tutorial post not found')
    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Tutorials</h1>
        <div className="prose dark:prose-invert">
          <p>Tutorial content not found</p>
        </div>
      </section>
    )
  }

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Tutorials</h1>
      <div className="prose dark:prose-invert">
        <ErrorBoundary fallback={<p>Error loading tutorials</p>}>
          <CustomMDX source={tutorialPost.content} />
        </ErrorBoundary>
      </div>
    </section>
  )
} 