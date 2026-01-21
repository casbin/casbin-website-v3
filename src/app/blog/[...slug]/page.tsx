import { blogSource, PageData } from "@/lib/source";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { BlogPostActions } from "@/components/blog/BlogPostActions";
import { InlineTOC } from "@/components/inline-toc";

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = blogSource.getPage(slug);

  if (!page) notFound();

  const data = page.data as unknown as PageData;
  const MDX = data.body as any; // Fumadocs MDX component
  const toc = data.toc;
  const url = `/blog/${page.slugs.join("/")}`;

  return (
    <DocsPage toc={toc} full={data.full}>
      <DocsBody>
        {data.author && <AuthorCard
          author={data.author}
          authorURL={data.authorURL}
          date={data.date ? new Date(data.date).toISOString() : undefined}
        />}
        <h1>{data.title}</h1>
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
