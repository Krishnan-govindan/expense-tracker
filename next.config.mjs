/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/expense-tracker' : '',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
