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
  const { userId } = auth()

  if (!userId && isProtectedRoute(req)) {
    const url = new URL(req.nextUrl.origin)
    // Add custom logic to run before redirecting
    auth().protect({
      unauthenticatedUrl: `${url.origin}/signin`,
      unauthorizedUrl: `${url.origin}/dashboard`,
    })
  }
  if (userId !== null) {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        role: ' user',
      },
    })
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
