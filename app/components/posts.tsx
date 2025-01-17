import Link from 'next/link'
import { getBlogPosts } from '@/app/notes/utils'

export async function BlogPosts() {
  const posts = await getBlogPosts()
  
  // Filter out posts that should have their own routes
  const filteredPosts = posts.filter(post => {
    // Exclude tutorials and course-resources posts completely
    if (post.category === 'tutorials' || 
        (post.category === 'base' && post.slug === 'course-resources')) {
      return false
    }
    return true
  })
  
  // Group posts by category
  const postsByCategory = filteredPosts.reduce((acc, post) => {
    acc[post.category] = acc[post.category] || []
    acc[post.category].push(post)
    return acc
  }, {} as Record<string, typeof posts>)

  return (
    <div className="prose prose-neutral dark:prose-invert">
      {Object.entries(postsByCategory).map(([category, categoryPosts]) => (
        <div key={category}>
          <h2 className="capitalize">{category}</h2>
          <ul>
            {categoryPosts.map((post) => (
              <li key={post.slug}>
                <Link 
                  href={category === 'notes' ? `/notes/${post.slug}` : `/${post.slug}`}
                  className="text-neutral-800 dark:text-neutral-200"
                >
                  {post.metadata?.title || post.slug}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
