import { blogSource } from "@/lib/source";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { BlogPostActions } from "@/components/blog/BlogPostActions";
import { InlineTOC } from "@/components/inline-toc";
import type { TOCItemType } from "fumadocs-core/toc";
import type { MDXComponents } from 'mdx/types';

interface BlogPageData {
  body: React.ComponentType<{ components?: MDXComponents }>;
  toc: TOCItemType[];
  full: boolean;
  author?: string;
  authorURL?: string;
  date?: string;
  title: string;
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = blogSource.getPage(slug);

  if (!page) notFound();

  const pageData = page.data as BlogPageData;
  const MDX = pageData.body;
  const toc = pageData.toc;
  const url = `/blog/${page.slugs.join("/")}`;

  return (
    <DocsPage toc={toc} full={pageData.full}>
      <DocsBody>
        {pageData.author && <AuthorCard
          author={pageData.author}
          authorURL={pageData.authorURL}
          date={pageData.date}
        />}
        <h1>{pageData.title}</h1>
        <BlogPostActions url={url} />
        {toc && toc.length > 0 && (
          <div className="my-6">
            <InlineTOC items={toc} />
          </div>
        )}
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return blogSource.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = blogSource.getPage(slug);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
