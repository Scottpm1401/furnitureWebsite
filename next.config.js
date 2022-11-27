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
        hostname: 'dl.airtable.com',
        port: '',
        pathname: '/.attachments/**',
      },
    ],
  },
};

module.exports = nextConfig;
