/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate');

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: `default-src 'self' ${process.env.NEXT_PUBLIC_BE_URL} ${process.env.NEXT_PUBLIC_CLOUDINARY_URL} vitals.vercel-insights.com; img-src * data:; media-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com data:; frame-src https://www.google.com https://js.stripe.com;`,
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
];

const nextConfig = {
  ...nextTranslate(),
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/**`,
      },
    ],
  },

  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  poweredByHeader: false,
};

module.exports = nextConfig;
