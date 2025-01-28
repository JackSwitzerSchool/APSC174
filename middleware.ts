import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Handle legacy routes
  if (pathname.startsWith('/notes/')) {
    const slug = pathname.split('/').slice(2).join('/')
    return NextResponse.redirect(
      new URL(`/content/notes/${slug}`, request.url)
    )
  }

  // Handle base routes
  if (pathname.startsWith('/base/')) {
    const slug = pathname.split('/').slice(2).join('/')
    return NextResponse.redirect(
      new URL(`/content/pages/${slug}`, request.url)
    )
  }

  // Handle tutorial routes
  if (pathname.startsWith('/tutorials/')) {
    const slug = pathname.split('/').slice(2).join('/')
    return NextResponse.redirect(
      new URL(`/content/tutorials/${slug}`, request.url)
    )
  }

  // Handle PDF files
  if (pathname.endsWith('.pdf')) {
    // If it's already in the assets directory or starts with /, serve it
    if (pathname.startsWith('/content/assets/') || pathname.startsWith('/')) {
      return NextResponse.next()
    }
    // Otherwise, redirect to assets directory
    const pdfName = pathname.split('/').pop()
    return NextResponse.redirect(
      new URL(`/content/assets/pdfs/${pdfName}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // Match PDF files specifically
    '/:path*/:file*.pdf'
  ]
} 