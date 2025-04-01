import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["developer.accuweather.com"],
  },
};

export default nextConfig;
