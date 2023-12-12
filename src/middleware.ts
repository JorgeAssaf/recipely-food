import { NextResponse } from 'next/server'
import { authMiddleware, clerkClient } from '@clerk/nextjs'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    '/',
    '/signin(.*)',
    '/signup(.*)',
    '/sso-callback(.*)',
    '/categories(.*)',
    '/category(.*)',
    '/recipes(.*)',
    '/recipe(.*)',
    '/blog(.*)',
    '/about(.*)',
    '/api(.*)',
  ],
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      return NextResponse.next()
    }

    const url = new URL(req.nextUrl.origin)

    if (!auth.userId) {
      url.pathname = '/signin'
      return NextResponse.redirect(url)
    }

    const user = await clerkClient.users.getUser(auth.userId)

    if (!user.publicMetadata.role) {
      await clerkClient.users.updateUserMetadata(auth.userId, {
        privateMetadata: {
          role: 'user_role',
        },
      })
    }
  },
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
