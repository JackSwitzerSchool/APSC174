import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Handle various formats of the course resources URL
  if (
    pathname.toLowerCase() === '/course-resources' ||
    pathname.toLowerCase() === '/course resources'
  ) {
    return NextResponse.redirect(
      new URL('/base/course-resources', request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/course-resources', '/course resources']
} 