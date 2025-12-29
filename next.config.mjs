import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
<<<<<<< HEAD
  // i18n: {
  //   locales: ['en', 'zh', 'ja', 'ko', 'fr', 'de', 'es', 'ru', 'ar', 'pt', 'it', 'tr', 'id', 'th', 'ms', 'uk', 'vi'],
  //   defaultLocale: 'en',
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.casbin.org',
      },
    ],
  },
=======
>>>>>>> afa4ddb (Initial commit from Create Fumadocs App)
};

export default withMDX(config);
