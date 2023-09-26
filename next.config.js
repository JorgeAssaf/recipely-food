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

module.exports = nextConfig
