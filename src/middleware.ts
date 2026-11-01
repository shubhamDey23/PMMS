import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE_NAME, verifySessionToken } from './lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value

  const isSessionValid = sessionToken ? await verifySessionToken(sessionToken) : null

  // 1. Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    if (!isSessionValid) {
      const returnUrl = encodeURIComponent(pathname + search)
      const loginUrl = new URL(`/login?next=${returnUrl}`, request.url)
      const response = NextResponse.redirect(loginUrl)
      // Clean up invalid session cookie if present
      if (sessionToken) {
        response.cookies.delete(SESSION_COOKIE_NAME)
      }
      return response
    }
    return NextResponse.next()
  }

  // 2. Redirect authenticated users away from /login to /admin
  if (pathname === '/login') {
    if (isSessionValid) {
      const nextParam = request.nextUrl.searchParams.get('next')
      let destination = '/admin'
      if (nextParam && nextParam.startsWith('/admin') && !nextParam.startsWith('//') && !nextParam.startsWith('/\\')) {
        destination = nextParam
      }
      return NextResponse.redirect(new URL(destination, request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}

