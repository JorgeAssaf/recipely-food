import type { NextConfig } from 'next'
import { withContentCollections } from '@content-collections/next'

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'qq9k04yhfp.ufs.sh',
        port: '',
      },
    ],
  },
} satisfies NextConfig

export default withContentCollections(nextConfig)
