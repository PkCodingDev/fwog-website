import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ['i2c.seadn.io'], // hier die externe Domain erlauben
  },
};

export default nextConfig;
