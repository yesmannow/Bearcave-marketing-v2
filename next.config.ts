import type { NextConfig } from "next";
import path from "path";

// In environments where Google Fonts is unreachable at build time,
// set NEXT_FONT_GOOGLE_MOCKED_RESPONSES so the build can complete.
// In production deployments, remove font-mock.json so real fonts are fetched
// and self-hosted by Next.js for optimal performance.
if (!process.env.NEXT_FONT_GOOGLE_MOCKED_RESPONSES) {
  const mockPath = path.join(process.cwd(), "font-mock.json");
  try {
    require("fs").accessSync(mockPath);
    process.env.NEXT_FONT_GOOGLE_MOCKED_RESPONSES = mockPath;
  } catch {
    // font-mock.json not present — real Google Fonts fetch will be used
  }
}

const nextConfig: NextConfig = {};

export default nextConfig;
