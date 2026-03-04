import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Essential for Cloudflare sub-page routing stability
  trailingSlash: true,

  // 2. Transpile three.js and R3F ecosystem for webpack compatibility
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  // 2. Cloudinary remote patterns — restricted to specific image folders for security
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/djhqowk67/image/upload/**",
      },
    ],
  },

  // 3. Enable React Strict Mode for improved stability
  reactStrictMode: true,
};

export default nextConfig;
