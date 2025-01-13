import { formatDate, getBlogPosts } from '@/app/notes/utils'
import type { BlogPost } from '@/app/notes/utils'

interface PostsProps {
  posts: BlogPost[]
}

export function Posts({ posts }: PostsProps) {
  return (
    <div className="flex flex-col gap-8">
      {posts.map((post) => (
        <article key={post.slug}>
          <a href={`/notes/${post.slug}`}>
            <h2 className="font-medium mb-1">
              {post.metadata.title}
            </h2>
          </a>
          {post.metadata.summary && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {post.metadata.summary}
            </p>
          )}
          <time className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt)}
          </time>
        </article>
      ))}
    </div>
  )
}

// Add BlogPosts component that fetches its own data
export async function BlogPosts() {
  const posts = await getBlogPosts()
  // Sort posts by date
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  )
  return <Posts posts={sortedPosts} />
}
