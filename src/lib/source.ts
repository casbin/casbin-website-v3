import { docs, blog } from "fumadocs-mdx:collections/server";
import { type InferPageType, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { icons } from "lucide-react";
import { createElement } from "react";

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

// Define category page mappings - single source of truth for all category pages
// This replaces the hardcoded categoryPageMappings in the category page component
export const categoryPageConfigs: Record<string, string[]> = {
  "the-basics": [
    "the-basics/overview",
    "the-basics/get-started",
    "the-basics/how-it-works",
    "the-basics/tutorial",
  ],
  model: [
    "model/supported-models",
    "model/syntax-for-models",
    "model/effector",
    "model/function",
    "model/rebac",
    "model/abac",
    "model/pbac",
    "model/orbac",
    "model/priority-model",
    "model/ucon",
    "model/super-admin",
    "model/rbac",
    "model/rbac/rbac",
    "model/rbac/rbac-with-pattern",
    "model/rbac/rbac-with-domains",
    "model/rbac/rbac-with-conditions",
    "model/rbac/casbin-rbac-and-rbac96",
    "model/mac",
    "model/mac/blp",
    "model/mac/biba",
    "model/mac/lbac",
  ],
  storage: ["storage/model-storage", "storage/policy-storage", "storage/policy-subset-loading"],
  scenarios: ["scenarios/data-permissions", "scenarios/menu-permissions"],
  plugins: [
    "plugins/plugins-overview",
    "plugins/enforcers",
    "plugins/adapters",
    "plugins/watchers",
    "plugins/dispatchers",
    "plugins/role-managers",
    "plugins/middlewares",
    "plugins/middlewares/kong-authz",
    "plugins/middlewares/graphql-middlewares",
    "plugins/middlewares/cloud-native",
  ],
  api: [
    "api/api-overview",
    "api/index-api",
    "api/management-api",
    "api/rbac-api",
    "api/rbac-with-domains-api",
    "api/rbac-with-conditions-api",
    "api/role-manager-api",
  ],
  "advanced-usage": [
    "advanced-usage/multi-threading",
    "advanced-usage/benchmark",
    "advanced-usage/performance",
    "advanced-usage/k8s-authz",
    "advanced-usage/k8s-gate-keeper",
    "advanced-usage/envoy-authz",
  ],
  management: [
    "management/admin-portal",
    "management/service",
    "management/command-line-tools",
    "management/log-error",
    "management/frontend-usage",
  ],
  editor: ["editor/online-editor", "editor/ide-plugins"],
  more: ["more/adopters", "more/contributing", "more/privacy-policy", "more/terms-of-service"],
};

// Subcategory overview pages that should show as folder cards with icons
export const subCategoryOverviews: Record<string, { icon: string; label: string }> = {
  "model/rbac": { icon: "📁", label: "RBAC" },
  "model/mac": { icon: "📁", label: "MAC" },
  "plugins/middlewares": { icon: "📁", label: "Middlewares" },
};

// Get the item count for a subcategory by dynamically counting pages under it
export function getSubCategoryItemCount(relativePath: string): number {
  for (const pages of Object.values(categoryPageConfigs)) {
    if (pages.includes(relativePath)) {
      const parentPath = relativePath;
      return pages.filter((path) => path.startsWith(parentPath + "/") || path === parentPath)
        .length;
    }
  }
  return 0;
}

// Get pages for a specific category slug
export function getCategoryPages(
  categorySlug: string,
): { url: string; data: { title: string; description?: string } }[] {
  const pageSlugs = categoryPageConfigs[categorySlug];
  if (!pageSlugs) return [];

  const pages: { url: string; data: { title: string; description?: string } }[] = [];
  for (const pageSlug of pageSlugs) {
    const page = source.getPage([pageSlug]);
    if (page) {
      pages.push({
        url: page.url,
        data: {
          title: page.data.title,
          description: page.data.description,
        },
      });
    }
  }
  return pages;
}

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
  icon(icon) {
    if (!icon) return;
    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
});

export const blogSource = loader({
  baseUrl: "/blog",
  source: blog.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
  icon(icon) {
    if (!icon) return;
    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
});

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
