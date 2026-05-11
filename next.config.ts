import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Permite usar imágenes externas de Cloudinary
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
