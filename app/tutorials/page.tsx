import { getBlogPosts, type BlogPost } from '@/app/notes/utils'
import { CustomMDX } from '@/app/components/mdx'

export const metadata = {
  title: 'Tutorials',
  description: 'Course tutorials and practice problems.',
}

export default async function TutorialsPage() {
  const posts = await getBlogPosts()
  const tutorialHeader = posts.find(
    (post): post is BlogPost => 
      post.originalFilename === 'tutorialsHeader.md' && post.category === 'tutorials'
  )
  
  if (!tutorialHeader) {
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
      <div className="prose prose-neutral dark:prose-invert">
        <CustomMDX source={tutorialHeader.content} />
      </div>
    </section>
  )
} 