import Link from 'next/link'
import { getBlogPosts } from '@/app/notes/utils'
import { formatDate } from '@/app/notes/utils'

export async function BlogPosts({ category }: { category?: string }) {
  const posts = await getBlogPosts()
  
  // Filter posts by category if specified
  const filteredPosts = category 
    ? posts.filter(post => post.category === category)
    : posts.filter(post => {
        // Exclude tutorials and course-resources from general view
        if (post.category === 'tutorials' || 
            (post.category === 'base' && post.slug === 'course-resources')) {
          return false
        }
        return true
      })

  // Group posts by category if no specific category is requested
  const postsByCategory = category 
    ? { [category]: filteredPosts }
    : filteredPosts.reduce((acc, post) => {
        acc[post.category] = acc[post.category] || []
        acc[post.category].push(post)
        return acc
      }, {} as Record<string, typeof posts>)

  return (
    <div className="prose prose-neutral dark:prose-invert">
      {Object.entries(postsByCategory).map(([cat, categoryPosts]) => (
        <div key={cat}>
          {!category && <h2 className="capitalize">{cat}</h2>}
          <ul>
            {categoryPosts.map((post) => (
              <li key={post.slug}>
                <Link 
                  href={cat === 'notes' ? `/notes/${post.slug}` : `/${post.slug}`}
                  className="text-neutral-800 dark:text-neutral-200"
                >
                  {post.metadata?.title || post.slug}
                  {post.metadata?.publishedAt && (
                    <span className="text-neutral-500 dark:text-neutral-400 ml-2">
                      {formatDate(post.metadata.publishedAt)}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
