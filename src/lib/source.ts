import { docs, blog } from "fumadocs-mdx:collections/server";
import { type InferPageType, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";

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
  getText: (type: "raw" | "processed") => Promise<string>;
};

// Keep doc URLs flat so folder names stay out of the final pathname.
// Also filter out the locale folder from the URL
function flattenDocSlugs({ path }: { path: string }): string[] {
  const segments = path.replace(/\\/g, "/").split("/").filter(Boolean);
  
  // Remove the 'docs' and locale folder (first two segments for content/docs/en/...)
  // Skip "docs" and locale (en, zh, etc.) from URL generation
  const filteredSegments = segments.slice(2); // Skip locale folder
  
  const fileName = filteredSegments.pop() ?? "";
  const baseName = fileName.replace(/\.[^/.]+$/, "");

  if (baseName === "index") {
    return filteredSegments.map((segment) => encodeURI(segment));
  }

  return [encodeURI(baseName)];
}

// Create a source filtered by locale
function createLocalizedSource(locale: string) {
  return loader({
    baseUrl: `/${locale}/docs`,
    source: {
      ...docs.toFumadocsSource(),
      // Filter to only include files from this locale
      files: docs.toFumadocsSource().files.filter((file) => 
        file.path.includes(`docs/${locale}/`)
      ),
    },
    slugs: flattenDocSlugs,
    plugins: [lucideIconsPlugin()],
  });
}

function createLocalizedBlogSource(locale: string) {
  return loader({
    baseUrl: `/${locale}/blog`,
    source: {
      ...blog.toFumadocsSource(),
      // Filter to only include files from this locale
      files: blog.toFumadocsSource().files.filter((file) => 
        file.path.includes(`blog/${locale}/`)
      ),
    },
    plugins: [lucideIconsPlugin()],
  });
}

// For now, default to English
// In the actual implementation, this would be determined by the locale parameter
export const source = createLocalizedSource("en");
export const blogSource = createLocalizedBlogSource("en");

// Export function to get source for specific locale
export function getLocalizedSource(locale: string) {
  return createLocalizedSource(locale);
}

export function getLocalizedBlogSource(locale: string) {
  return createLocalizedBlogSource(locale);
}

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `/og/docs/${segments.join("/")}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const pageData = page.data as FumadocsPageData;
  const raw = await pageData.getText("raw");

  // Build metadata section
  const metadata: string[] = [];

  // Add page URL
  metadata.push(`URL: ${page.url}`);

  // Add source file URL on GitHub
  const normalizedPath = page.path.startsWith("content/") ? page.path : `content/${page.path}`;
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
    .replace(/\n\s*\n\s*\n+/g, "\n\n");

  return `# ${pageData.title}

${metadata.join("\n")}

${cleanedContent}`;
}
