import { blogSource } from "@/lib/source";
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

  const MDX = page.data.body;
  const toc = page.data.toc;
  const url = `/blog/${page.slugs.join("/")}`;

  return (
    <DocsPage toc={toc} full={page.data.full}>
      <DocsBody>
        {page.data.author && <AuthorCard
          author={page.data.author}
          authorURL={page.data.authorURL}
          date={page.data.date ? new Date(page.data.date).toISOString() : undefined}
        />}
        <h1>{page.data.title}</h1>
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
