import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  devIndicators: false,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;

