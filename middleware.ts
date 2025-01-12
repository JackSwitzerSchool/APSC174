import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Handle both /course-resources and encoded versions
  if (pathname === '/course-resources') {
    return NextResponse.redirect(
      new URL('/base/Course Resources', request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/course-resources']
} 