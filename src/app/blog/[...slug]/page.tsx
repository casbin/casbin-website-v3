import { blogSource } from '@/lib/source';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';

// Define proper type for blog page data
type BlogPageData = {
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
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = blogSource.getPage(slug);

  if (!page) notFound();

  const data = page.data as BlogPageData;
  const MDX = data.body as React.ComponentType;

  return (
    <DocsPage toc={data.toc} full={data.full}>
      <DocsBody>
        <h1>{data.title}</h1>
        <MDX />
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