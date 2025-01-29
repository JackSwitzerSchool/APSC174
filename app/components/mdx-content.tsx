'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { memo } from 'react'
import Link from 'next/link'

// Memoize components to prevent unnecessary re-renders
const components = {
  a: memo(({ href, children, ...props }: any) => {
    if (!href) return null

    // Handle PDF links
    if (href?.endsWith('.pdf')) {
      const formattedHref = href.startsWith('http') 
        ? href 
        : href.startsWith('/') 
          ? href 
          : `/content/assets/pdfs/${href}`

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

    // Handle wiki-style links (converted by remark-wiki-link)
    if (href.startsWith('/content/')) {
      return (
        <Link 
          href={href}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          {...props}
        >
          {children}
        </Link>
      )
    }

    // Default case - treat as internal link
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }),
  img: memo(({ src, alt = '', ...props }: any) => {
    if (!src) return null

    // Handle image paths
    const formattedSrc = src.startsWith('http') 
      ? src 
      : src.startsWith('/content/assets/') 
        ? src 
        : `/content/assets/images/${src}`

    return (
      <img 
        src={formattedSrc}
        alt={alt}
        className="max-w-full h-auto rounded-lg mx-auto my-4"
        loading="lazy"
        {...props}
      />
    )
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