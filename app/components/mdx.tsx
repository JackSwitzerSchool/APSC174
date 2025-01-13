'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import type { ComponentProps, DetailedHTMLProps, AnchorHTMLAttributes } from 'react'

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

type CustomLinkProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

const components = {
  a: ({ href, children, ...props }: CustomLinkProps) => {
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
        components={components as any}
      />
    </div>
  )
}

