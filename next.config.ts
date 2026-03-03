import type { NextConfig } from "next";
import path from "path";

/**
 * Build Resilience Logic
 * In environments where Google Fonts is unreachable at build time,
 * set NEXT_FONT_GOOGLE_MOCKED_RESPONSES so the build can complete.
 */
if (!process.env.NEXT_FONT_GOOGLE_MOCKED_RESPONSES) {
  const mockPath = path.join(process.cwd(), "font-mock.json");
  try {
    // Only apply if the mock file exists
    require("fs").accessSync(mockPath);
    process.env.NEXT_FONT_GOOGLE_MOCKED_RESPONSES = mockPath;
  } catch {
    // font-mock.json not present — real Google Fonts fetch will be used
  }
}

const nextConfig: NextConfig = {
  // 1. Essential for Cloudflare sub-page routing stability
  trailingSlash: true,

  // 2. Disable default Node.js image optimization (Not supported on Cloudflare Edge)
  images: {
    unoptimized: true,
  },

  // 3. Enable React Strict Mode for improved stability
  reactStrictMode: true,
};

export default nextConfig;
