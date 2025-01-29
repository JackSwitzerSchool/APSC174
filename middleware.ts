import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Handle legacy routes
  if (pathname.startsWith('/content/notes/')) {
    const slug = pathname.split('/').slice(3).join('/')
    return NextResponse.redirect(
      new URL(`/notes/${slug}`, request.url)
    )
  }

  // Handle legacy base routes
  if (pathname.startsWith('/content/')) {
    const path = pathname.split('/').slice(2).join('/')
    return NextResponse.redirect(
      new URL(`/${path}`, request.url)
    )
  }

  // Handle PDF files
  if (pathname.endsWith('.pdf')) {
    // If it's already in the assets directory, serve it
    if (pathname.startsWith('/content/assets/')) {
      return NextResponse.next()
    }
    // Otherwise, redirect to assets directory
    const pdfName = pathname.split('/').pop()
    return NextResponse.redirect(
      new URL(`/content/assets/pdf/base/${pdfName}`, request.url)
    )
  }

  // Handle direct note access
  if (/^\/[a-zA-Z0-9-]+$/.test(pathname) && pathname !== '/notes') {
    return NextResponse.redirect(
      new URL(`/notes${pathname}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files, API routes, and assets
    '/((?!api|_next/static|_next/image|favicon.ico|content/assets).*)',
    // Match PDF files specifically
    '/:path*/:file*.pdf'
  ]
} 