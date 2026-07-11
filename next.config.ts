import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/trendbizz-web' : '',
  assetPrefix: isProd ? '/trendbizz-web/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
