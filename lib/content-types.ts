import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export type ContentType = 'note' | 'page'

export interface ContentMeta {
  // Required fields
  title: string
  type: ContentType
  slug: string
  publishedAt: string
  
  // Optional fields
  category?: string
  tags?: string[]
  displayInNotes?: boolean
  order?: number
  summary?: string
  relatedContent?: string[]
}

export interface Content {
  meta: ContentMeta
  content: MDXRemoteSerializeResult
  originalPath: string
}

export interface ContentList {
  notes: Content[]
  pages: Content[]
}

export interface ContentFilter {
  type?: ContentType
  tags?: string[]
  displayInNotes?: boolean
  category?: string
}

export class ContentNotFoundError extends Error {
  constructor(slug: string) {
    super(`Content not found: ${slug}`)
    this.name = 'ContentNotFoundError'
  }
}

export class InvalidContentError extends Error {
  constructor(path: string, reason: string) {
    super(`Invalid content at ${path}: ${reason}`)
    this.name = 'InvalidContentError'
  }
} 