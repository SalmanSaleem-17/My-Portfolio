import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cloudinary images use a per-image custom loader (src/utils/imageLoader.ts)
    // so they load straight from Cloudinary's CDN, bypassing /_next/image.
    // Local /public assets keep Next's default optimizer.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
