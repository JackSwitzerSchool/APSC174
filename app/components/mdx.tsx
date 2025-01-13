'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import type { ComponentProps } from 'react'

// Create a base type for image props
type BaseImageProps = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'>

interface CustomImageProps {
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
  className?: string
  [key: string]: any
}

const components = {
  a: ({ href = '', ...props }: { href: string; [key: string]: any }) => {
    if (href.startsWith('http')) {
      return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    }
    return <Link href={href} {...props} />
  },
  img: ({ src, alt = '', width, height, ...props }: CustomImageProps) => {
    if (!src) return null

    const imageProps: ImageProps = {
      src,
      alt,
      width: width ? Number(width) : 800,
      height: height ? Number(height) : 400,
      className: "rounded-lg",
      ...props
    }

    return <Image {...imageProps} />
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

