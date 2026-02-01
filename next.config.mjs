import { createMDX } from "fumadocs-mdx/next";
import { docs, blog } from "./source.config.ts";

const withMDX = createMDX({
  collections: { docs, blog },
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.casbin.org",
      },
      {
        protocol: "https",
        hostname: "hsluoyz.github.io",
      },
      {
        protocol: "https",
        hostname: "learn.microsoft.com",
        pathname: "/**",
      },
    ],
  },
};

export default withMDX(config);
