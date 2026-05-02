import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
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
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'image.pollinations.ai',
      },
    ],
  }
};

const withNextIntl = createNextIntlPlugin('./i18n.config.ts');
export default withNextIntl(nextConfig);
