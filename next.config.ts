import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProd ? "/riotgear-storev11" : "",
  assetPrefix: isProd ? "/riotgear-storev11/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
