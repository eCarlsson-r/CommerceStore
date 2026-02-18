import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '**', // This allows any path under the hostname
      },
    ],
  }
};

export default nextConfig;
