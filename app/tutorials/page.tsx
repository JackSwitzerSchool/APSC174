import { getBlogPosts } from '../notes/utils'
import { CustomMDX } from '../components/mdx'

export const metadata = {
  title: 'Tutorials',
  description: 'Course tutorials and practice problems.',
}

export default function TutorialsPage() {
  const posts = getBlogPosts()
  const tutorialPost = posts.find(post => post.slug === 'tutorials')
  
  if (!tutorialPost) {
    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Tutorials</h1>
        <p>No tutorial content found</p>
      </section>
    )
  }
  
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Tutorials</h1>
      <div className="prose dark:prose-invert">
        <CustomMDX source={tutorialPost.content} />
      </div>
    </section>
  )
} 