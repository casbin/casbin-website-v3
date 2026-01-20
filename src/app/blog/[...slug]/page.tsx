import { blogSource } from "@/lib/source";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { AuthorCard } from "@/components/blog/AuthorCard";

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = blogSource.getPage(slug);

  if (!page) notFound();

  const MDX = (page.data as any).body;

  return (
    <DocsPage toc={(page.data as any).toc} full={(page.data as any).full}>
      <DocsBody>
        {(page.data as any).author && <AuthorCard
          author={(page.data as any).author}
          authorURL={(page.data as any).authorURL}
          date={(page.data as any).date}
        />}
        <h1>{(page.data as any).title}</h1>
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
