import { getBlogPosts } from '@/app/notes/utils'
import { NextResponse } from 'next/server'

export async function GET() {
  const posts = await getBlogPosts()
  return NextResponse.json(posts)
} 