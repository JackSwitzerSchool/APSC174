'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { memo } from 'react'
import dynamic from 'next/dynamic'

// Memoize components to prevent unnecessary re-renders
const components = {
  a: memo(({ href, children, ...props }: any) => {
    if (!href) return null

    // Handle PDF links
    if (href?.endsWith('.pdf')) {
      // Keep the path as-is for PDFs, they're served from /public
      const formattedHref = href.startsWith('http') 
        ? href 
        : href.startsWith('/') 
          ? href 
          : `/${href}`

      return (
        <a 
          href={formattedHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          {...props}
        >
          {children}
        </a>
      )
    }

    // Handle external links
    if (href.startsWith('http')) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      )
    }

    const Link = dynamic(() => import('next/link'))
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }),
  img: dynamic(() => import('./mdx-image'), {
    loading: () => <div>Loading image...</div>,
    ssr: false
  }),
  WikiLink: dynamic(() => import('./wiki-link'), {
    loading: () => <div>Loading link...</div>,
    ssr: false
  })
}

interface MDXContentProps {
  source: MDXRemoteSerializeResult
}

// Memoize the entire component
export default memo(function MDXContent({ source }: MDXContentProps) {
  if (!source?.compiledSource) {
    return <div>Loading...</div>
  }

  return (
    <div className="prose prose-neutral dark:prose-invert">
      <MDXRemote {...source} components={components} />
    </div>
  )
}) 