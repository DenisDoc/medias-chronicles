import type { NextConfig } from 'next'
// @ts-ignore - next-pwa doesn't have types
import withPWA from 'next-pwa'

const nextConfig: NextConfig = {
  output: "export",                  // <-- export as static site
  basePath: "/medias-chronicles",    // <-- your repo name
  sassOptions: {},
  images: {
    unoptimized: true,               // Next.js images won't work fully in static export
  },
  turbopack: {},
}

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/],
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
})(nextConfig)
