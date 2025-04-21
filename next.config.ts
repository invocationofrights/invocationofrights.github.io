import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For Next.js 13+ static export
  output: 'export',
  images: {
    unoptimized: true,          // ← disable the Image optimizer for static export
  },
};

module.exports = nextConfig

export default nextConfig;
