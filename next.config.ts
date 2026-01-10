import type { NextConfig } from 'next'
// @ts-ignore - next-pwa doesn't have types
import withPWA from 'next-pwa'
 
const nextConfig: NextConfig = {
  sassOptions: {
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