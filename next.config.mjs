import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
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
      }
    ],

  },
}

export default withContentlayer(nextConfig)