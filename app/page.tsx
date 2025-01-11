import { getBlogPosts } from './notes/utils'
import { CustomMDX } from './components/mdx'

export default function Home() {
  const posts = getBlogPosts()
  const week1Post = posts.find(post => post.slug === 'Week 1')
  
  return (
    <div className="prose dark:prose-invert">
      {week1Post ? (
        <CustomMDX source={week1Post.content} />
      ) : (
        <p>Week 1 content not found</p>
      )}
    </div>
  )
}
