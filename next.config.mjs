import { createMDX } from "fumadocs-mdx/next";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url, { interopDefault: true, moduleCache: false });
const { docs, blog } = jiti("./source.config.ts");

const withMDX = createMDX({
  collections: { docs, blog },
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // i18n: {
  //   locales: ['en', 'zh', 'ja', 'ko', 'fr', 'de', 'es', 'ru', 'ar', 'pt', 'it', 'tr', 'id', 'th', 'ms', 'uk', 'vi'],
  //   defaultLocale: 'en',
  // },
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
