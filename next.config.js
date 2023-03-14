/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/db/:path*',
        destination: 'https://task-list-api.vercel.app/db/:path*'
      }
    ]
  }
}

module.exports = nextConfig
