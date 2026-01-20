import { docs, blog } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';

// Keep doc URLs flat so folder names stay out of the final pathname.
function flattenDocSlugs({ path }: { path: string }): string[] {
  const segments = path.replace(/\\/g, '/' ).split('/' ).filter(Boolean);
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
  const processed = await page.data.getText('processed');

  return `# ${page.data.title}

${processed}`;
}
