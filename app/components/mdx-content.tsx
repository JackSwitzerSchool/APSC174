'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Link from 'next/link'
import Image from 'next/image'

const components = {
  a: ({ href, children, ...props }: any) => {
    if (!href) return null
    if (href.startsWith('http')) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  },
  img: ({ src, alt = '', ...props }: any) => {
    if (!src) return null
    return (
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        className="rounded-lg"
        {...props}
      />
    )
  }
}

interface MDXContentProps {
  source: MDXRemoteSerializeResult
}

export default function MDXContent({ source }: MDXContentProps) {
  if (!source?.compiledSource) {
    return null
  }

  return <MDXRemote {...source} components={components} />
} 