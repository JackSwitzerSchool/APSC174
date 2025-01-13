'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Link from 'next/link'
import Image from 'next/image'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import type { MDXComponents as MDXComponentsType } from 'mdx/types'
import type { ComponentProps } from 'react'

interface CustomImageProps extends Omit<ComponentProps<'img'>, 'src'> {
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
}

const components = {
  a: ({ href = '', ...props }: { href: string; [key: string]: any }) => {
    if (href.startsWith('http')) {
      return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    }
    return <Link href={href} {...props} />
  },
  img: ({ src, alt, width, height, ...props }: CustomImageProps) => {
    if (!src) return null
    return (
      <Image
        src={src}
        alt={alt || ''}
        width={width ? Number(width) : 800}
        height={height ? Number(height) : 400}
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

