import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
