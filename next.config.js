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
        hostname: 'res.cloudinary.com',
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/**`,
      },
    ],
  },
};

module.exports = nextConfig;
