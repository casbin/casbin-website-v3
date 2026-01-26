import { docs, blog } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';

// Define proper types for page data
type PageData = {
  title: string;
  description?: string;
  date?: string;
  body: unknown;
  toc?: Array<{
    title: string;
    url: string;
    depth?: number;
    items?: Array<{ title: string; url: string; depth?: number }>;
  }>;
  full?: boolean;
};

type FumadocsPageData = PageData & {
  getText: (type: 'raw' | 'processed') => Promise<string>;
};

// Keep doc URLs flat so folder names stay out of the final pathname.
function flattenDocSlugs({ path }: { path: string }): string[] {
  const segments = path.replace(/\\/g, '/').split('/').filter(Boolean);
  const fileName = segments.pop() ?? '';
  const baseName = fileName.replace(/\.[^/.]+$/, '');

  if (baseName === 'index') {
    return segments
      .filter((segment) => segment !== 'docs')
      .map((segment) => encodeURI(segment));
  }

  return [encodeURI(baseName)];
}

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  slugs: flattenDocSlugs,
  plugins: [lucideIconsPlugin()],
});

export const blogSource = loader({
  baseUrl: '/blog',
  source: blog.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const pageData = page.data as FumadocsPageData;
  const raw = await pageData.getText('raw');

  // Build metadata section
  const metadata: string[] = [];

  // Add page URL
  metadata.push(`URL: ${page.url}`);

  // Add source file URL on GitHub
  const normalizedPath = page.path.startsWith('content/') ? page.path : `content/${page.path}`;
  const sourceUrl = `https://github.com/casbin/casbin-website-v3/blob/master/${normalizedPath}`;
  metadata.push(`Source: ${sourceUrl}`);

  // Add description if available
  if (pageData.description) {
    metadata.push(`\n${pageData.description}`);
  }

  // Clean up raw MDX content: remove MDX component tags and excessive blank lines
  // Only remove tags that are clearly MDX components (contain capital letters or hyphenated names)
  const cleanedContent = raw
    .replace(/<[A-Z][^>]*\/?>/g, "") // Remove MDX components starting with capital letter (e.g., <Feedback />, <Card>)
    .trim()
    .replace(/\n\s*\n\s*\n+/g, '\n\n');

  return `# ${pageData.title}

${metadata.join('\n')}

${cleanedContent}`;
}
