/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['boarpeges.netservex.com', "http://localhost:3001", "http://localhost:3000", "img.youtube.com"],
  },
};

module.exports = nextConfig;
