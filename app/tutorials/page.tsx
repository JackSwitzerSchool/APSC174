import { getBlogPosts } from '../notes/utils'
import { CustomMDX } from '../components/mdx'

export const metadata = {
  title: 'Tutorials',
  description: 'Course tutorials and practice problems.',
}

export default function TutorialsPage() {
  const posts = getBlogPosts()
  const tutorialPost = posts.find(post => post.slug === 'tutorials')
  
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Tutorials</h1>
      <div className="prose dark:prose-invert">
        {tutorialPost ? (
          <CustomMDX source={tutorialPost.content} />
        ) : (
          <p>Tutorial content not found</p>
        )}
      </div>
    </section>
  )
} 