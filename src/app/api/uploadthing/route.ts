import { createNextRouteHandler } from 'uploadthing/next'

import { ourFileRouter } from './core'

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
  config: {
    uploadthingSecret: process.env.UPLOADTHING_SECRET,
    uploadthingId: process.env.UPLOADTHING_APP_ID,
  },
})
