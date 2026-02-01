import { getPageImage, source } from "@/lib/source";
import { LLMCopyButton, ViewOptions } from "@/components/ai/page-actions";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { MDXComponents } from "mdx/types";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import * as Twoslash from "fumadocs-twoslash/ui";
import Link from "next/link";
import { Feedback } from "@/components/feedback/client";
import { onPageFeedbackAction } from "@/lib/github";
import { LastUpdated } from "@/components/last-updated";
import Comments from "@/components/Comments";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { calculateReadingTime } from "@/lib/utils";

// Define proper type for docs page data
type DocsPageData = {
  title: string;
  description?: string;
  body: unknown;
  toc?: Array<{
    title: string;
    url: string;
    depth: number;
    items?: Array<{ title: string; url: string; depth: number }>;
  }>;
  full?: boolean;
  authors?: string[];
  date?: string;
  getText: (type: "raw" | "processed") => Promise<string>;
};

// Helper function to normalize doc file paths
function normalizeDocPath(path: string): string {
  let normalized = path.startsWith("content/") ? path : `content/${path}`;
  if (!normalized.startsWith("content/docs/")) {
    normalized = normalized.replace(/^content\//, "content/docs/");
  }
  return normalized;
}

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const data = page.data as DocsPageData;
  const MDX = data.body as React.ComponentType<{ components?: MDXComponents }>;
  const filePath = normalizeDocPath(page.path ?? "");
  const githubUrl = `https://github.com/casbin/casbin-website-v3/blob/master/${filePath}`;

  const rawContent = await data.getText("raw");
  const readTime = calculateReadingTime(rawContent);

  return (
    <DocsPage
      toc={data.toc}
      full={data.full}
      footer={{
        // Render comments below the built-in prev/next recommendations
        children: <Comments />,
      }}
    >
      <DocsTitle>{data.title}</DocsTitle>
      <DocsDescription className="!mb-2 text-base">{data.description}</DocsDescription>
      {((data.authors && data.authors.length > 0) || page.path) && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pt-1 pb-4 mb-4 gap-2">
          {data.authors && data.authors.length > 0 && (
            <AuthorCard authors={data.authors} date={data.date} readTime={readTime} />
          )}
          {page.path && (
            <div className="flex flex-row gap-2 shrink-0">
              <LLMCopyButton slugs={page.slugs} />
              <ViewOptions pagePath={page.path} githubUrl={githubUrl} />
            </div>
          )}
        </div>
      )}
      <DocsBody>
        <MDX
          components={getMDXComponents({
            ...Twoslash,
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
      <Feedback onSendAction={onPageFeedbackAction} />
      <LastUpdated filePath={filePath} />
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<"/docs/[[...slug]]">): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
