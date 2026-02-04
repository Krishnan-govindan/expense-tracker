/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/expense-tracker',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
