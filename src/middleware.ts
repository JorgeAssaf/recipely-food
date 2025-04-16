// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  if (!userId && isProtectedRoute(req)) {
    const unauthenticatedUrl = `${req.nextUrl.origin}/signin`
    const unauthorizedUrl = `${req.nextUrl.origin}/dashboard`

    await auth.protect({
      unauthenticatedUrl,
      unauthorizedUrl,
    })
    return
  }

  if (userId) {
    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    if (user) {
      const role = user.privateMetadata.role

      // Add custom logic to run before redirecting
      if (!role) {
        await client.users.updateUserMetadata(userId, {
          privateMetadata: {
            role: 'user',
          },
        })
      }
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
