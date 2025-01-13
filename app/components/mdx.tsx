'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Link from 'next/link'
import Image from 'next/image'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import type { MDXComponents as MDXComponentsType } from 'mdx/types'

const components = {
  a: ({ href = '', ...props }) => {
    if (href.startsWith('http')) {
      return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    }
    return <Link href={href} {...props} />
  },
  img: ({ src, alt, ...props }) => {
    if (!src) return null
    return (
      <Image
        src={src}
        alt={alt || ''}
        width={800}
        height={400}
        className="rounded-lg"
        {...props}
      />
    )
  }
}

const options = {
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  }
}

export function CustomMDX({ source }: { source: MDXRemoteSerializeResult }) {
  return (
    <div className="prose prose-neutral dark:prose-invert">
      <MDXRemote 
        {...source}
        components={components}
      />
    </div>
  )
}

