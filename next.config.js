/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://backend-fz9m.onrender.com/api/:path*",
      },
    ]
  },
}

module.exports = nextConfig
