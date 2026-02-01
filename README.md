# Casbin Website V3

[![GitHub Action](https://github.com/casbin/casbin-website-v3/workflows/Lint/badge.svg?branch=main)](https://github.com/casbin/casbin-website-v3/actions)
[![Release](https://img.shields.io/github/release/casbin/casbin-website-v3.svg)](https://github.com/casbin/casbin-website-v3/releases/latest)
[![Discord](https://img.shields.io/discord/1022748306096537660?logo=discord&label=discord&color=5865F2)](https://discord.gg/S5UjpzGZjN)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

The official website for Casbin. Casbin is an authorization library that supports access control models like ACL, RBAC, ABAC for Golang, Java, C#, JavaScript, Python, PHP and other languages.

This is a Next.js application built with [Fumadocs](https://fumadocs.dev/), a modern documentation framework.

## Live Site

Visit the live site at: https://casbin.org

## Get Started

### Requirements

1. [Git](https://git-scm.com/downloads)
2. [Node.js](https://nodejs.org/en/download/): v20 or above
3. npm (comes with Node.js)

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/casbin/casbin-website-v3.git
   cd casbin-website-v3
   ```

2. Install dependencies:
   ```bash
   npm ci
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

In the project, you can see:

- `source.config.ts`: Configuration for content source adapter
- `src/lib/source.ts`: Code for content source adapter, [`loader()`](https://fumadocs.dev/docs/headless/source-api) provides the interface to access your content
- `src/lib/layout.shared.tsx`: Shared options for layouts

| Route                     | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `app/(home)`              | The route group for your landing page and other pages |
| `app/docs`                | The documentation layout and pages                     |
| `app/api/search/route.ts` | The Route Handler for search                           |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run types:check` - Type check the project

## Contributing

We welcome contributions! Here's how you can help:

### Documentation Writing

For the configuration of the sidebar and navigation, refer to the [Fumadocs documentation](https://fumadocs.dev/docs).

For the features that you may use when writing documents, please refer to [Markdown Features](https://fumadocs.dev/docs/mdx).

### Reporting Issues

If you find any issues or have suggestions, please open an issue on our [GitHub Issues](https://github.com/casbin/casbin-website-v3/issues) page.

### Submitting Pull Requests

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/) format
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Note**: This project uses [semantic-release](https://github.com/semantic-release/semantic-release) for automated version management and package publishing. Please use conventional commit messages (e.g., `feat:`, `fix:`, `docs:`) for your commits.

## Learn More

To learn more about Next.js and Fumadocs, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Fumadocs](https://fumadocs.dev) - learn about Fumadocs

## License

This project is licensed under the [Apache-2.0 License](LICENSE).
