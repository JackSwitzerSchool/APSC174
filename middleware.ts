import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Handle base pages
  const basePages = ['course-resources', 'midterm-1', 'midterm-2', 'webwork', 'final-exam']
  for (const page of basePages) {
    if (pathname.toLowerCase() === `/${page}`) {
      return NextResponse.redirect(
        new URL(`/base/${page}`, request.url)
      )
    }
  }

  // Handle PDF files in base directory
  if (pathname.endsWith('.pdf') && !pathname.startsWith('/base/')) {
    return NextResponse.redirect(
      new URL(`/base${pathname}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/course-resources',
    '/midterm-1', 
    '/midterm-2', 
    '/webwork', 
    '/final-exam',
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
} 