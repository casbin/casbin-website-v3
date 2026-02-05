import { getCategoryPages, subCategoryOverviews, getSubCategoryItemCount } from "@/lib/source";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import { PrevNext } from "@/components/docs/PrevNext";
import { Feedback } from "@/components/feedback/client";
import { LastUpdated } from "@/components/last-updated";
import Comments from "@/components/Comments";
import { onPageFeedbackAction } from "@/lib/github";

const categoryDisplayNames: Record<string, string> = {
  "the-basics": "The Basics",
  model: "Model",
  storage: "Storage",
  scenarios: "Scenarios",
  plugins: "Plugins",
  api: "API",
  "advanced-usage": "Advanced Usage",
  management: "Management",
  editor: "Editor",
  more: "More",
};

interface PageInfo {
  url: string;
  data: {
    title: string;
    description?: string;
  };
}

interface PageProps {
  params: Promise<{ slug: string | string[] }>;
}

export default async function CategoryPage(props: PageProps) {
  const params = await props.params;
  const slugData = (params as { slug?: string | string[] }).slug;
  const categoryName = Array.isArray(slugData) ? slugData.join("/") : (slugData ?? "");

  const displayName =
    categoryDisplayNames[categoryName] ||
    categoryName
      .split("-")
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // Use getCategoryPages from source.ts instead of hardcoded mappings
  const categoryPages = getCategoryPages(categoryName);

  if (categoryPages.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">{displayName}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryPages.map((page) => {
          // Check if this is a subcategory overview page (relative path without /docs/)
          const relativePath = page.url.replace(/^\/docs\//, "");
          const subCategoryConfig = subCategoryOverviews[relativePath];

          if (subCategoryConfig) {
            const itemCount = getSubCategoryItemCount(relativePath);
            return (
              <Link key={page.url} href={page.url} className="block">
                <Card className="h-full hover:border-primary transition-colors">
                  <CardHeader>
                    <CardTitle>
                      {subCategoryConfig.icon} {subCategoryConfig.label}
                    </CardTitle>
                    <CardDescription>{itemCount} items</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          }

          // Regular page
          return (
            <Link key={page.url} href={page.url} className="block">
              <Card className="h-full hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle>📄 {page.data.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {page.data.description && (
                    <CardDescription>{page.data.description}</CardDescription>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Navigation, Feedback, and Comments */}
      <div className="mt-12 pt-8">
        <Feedback onSendAction={onPageFeedbackAction} />
        <PrevNext pages={categoryPages} currentUrl={`/docs/${categoryName}`} />
        <Comments />
      </div>
    </div>
  );
}

export async function generateStaticParams(): Promise<Array<{ slug: string[] }>> {
  return [
    { slug: ["the-basics"] },
    { slug: ["model"] },
    { slug: ["storage"] },
    { slug: ["scenarios"] },
    { slug: ["plugins"] },
    { slug: ["api"] },
    { slug: ["advanced-usage"] },
    { slug: ["management"] },
    { slug: ["editor"] },
    { slug: ["more"] },
  ];
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const slugData = (params as { slug?: string | string[] }).slug;
  const slug = Array.isArray(slugData) ? slugData.join("/") : (slugData ?? "");
  const displayName =
    categoryDisplayNames[slug] ||
    slug
      .split("-")
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  return {
    title: `${displayName} - Casbin Documentation`,
    description: `Browse all documentation pages in the ${displayName} category`,
  };
}
