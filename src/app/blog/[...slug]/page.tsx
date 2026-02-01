import { blogSource } from "@/lib/source";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { BlogPostActions } from "@/components/blog/BlogPostActions";
import { InlineTOC } from "@/components/inline-toc";
import type { TOCItemType } from "fumadocs-core/toc";
import Comments from "@/components/Comments";
import { calculateReadingTime } from "@/lib/utils";

interface BlogPageData {
  body: any;
  toc: TOCItemType[];
  full: boolean;
  author?: string;
  authorURL?: string;
  authorImageURL?: string;
  date?: string;
  title: string;
  getText: (type: "raw" | "processed") => Promise<string>;
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = blogSource.getPage(slug);

  if (!page) notFound();

  const pageData = page.data as BlogPageData;
  const MDX = pageData.body;
  const toc = pageData.toc;
  const url = `/blog/${page.slugs.join("/")}`;

  const rawContent = await pageData.getText("raw");
  const readTime = calculateReadingTime(rawContent);

  return (
    <DocsPage toc={toc} full={pageData.full}>
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {pageData.title}
        </h1>
        {(pageData.author || pageData.date) && (
          <AuthorCard
            author={pageData.author}
            authorURL={pageData.authorURL}
            authorImageURL={pageData.authorImageURL}
            date={pageData.date}
            readTime={readTime}
            className="mt-4"
          />
        )}
      </div>

      <DocsBody>
        <BlogPostActions url={url} />
        {toc && toc.length > 0 && (
          <div className="my-6">
            <InlineTOC items={toc} />
          </div>
        )}
        <MDX components={getMDXComponents()} />
        <Comments />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return blogSource.generateParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = blogSource.getPage(slug);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
