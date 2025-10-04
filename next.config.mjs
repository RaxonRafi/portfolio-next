/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
    experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // e.g. '5mb' | '10mb' | '20mb'
    },
  },
}

export default nextConfig
