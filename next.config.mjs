import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['images.unsplash.com', 'utfs.io'],
  },
}

export default withContentlayer(nextConfig)