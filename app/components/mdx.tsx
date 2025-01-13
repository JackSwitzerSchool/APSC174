'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'

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

interface CustomMDXProps {
  source: MDXRemoteSerializeResult
}

function MDXContent({ source }: CustomMDXProps) {
  return <MDXRemote {...source} components={components} />
}

export function CustomMDX({ source }: CustomMDXProps) {
  if (!source || !source.compiledSource) {
    return null
  }

  return (
    <div className="prose prose-neutral dark:prose-invert">
      <Suspense fallback={<div>Loading...</div>}>
        <MDXContent source={source} />
      </Suspense>
    </div>
  )
}

