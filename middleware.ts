import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Handle both /course-resources and encoded versions
  if (pathname === '/course-resources' || pathname === '/notes/base/course-resources') {
    return NextResponse.redirect(
      new URL('/notes/base/Course%20Resources', request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/course-resources', '/notes/base/course-resources']
} 