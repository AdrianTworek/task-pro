/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui', 'tailwindconfig', 'server-utils'],
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
