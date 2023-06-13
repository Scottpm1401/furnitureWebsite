/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate');

const nextConfig = {
  ...nextTranslate(),
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_CDN_NAME}`,
        pathname: `/**`,
      },
    ],
  },
};

module.exports = nextConfig;
