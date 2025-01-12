'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getBlogPosts } from '@/app/notes/utils'
import { formatDate } from '@/app/notes/utils'

interface BlogPost {
  slug: string
  category: string
  metadata: {
    title: string
    publishedAt: string
  }
}

export default function Posts() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const allBlogs = await getBlogPosts()
      const sortedBlogs = allBlogs.sort((a, b) => {
        if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
          return -1
        }
        return 1
      })
      setPosts(sortedBlogs)
    }

    fetchPosts()
  }, [])

  return (
    <div>
      {posts.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/${post.category}/${post.slug}`}
        >
          <div className="w-full flex flex-col">
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {post.metadata.title}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {formatDate(post.metadata.publishedAt)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
