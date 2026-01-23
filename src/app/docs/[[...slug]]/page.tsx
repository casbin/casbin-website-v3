import { getPageImage, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import Link from 'next/link';
import { Feedback } from '@/components/feedback/client';
import { onPageFeedbackAction } from '@/lib/github';
import { LastUpdated } from '@/components/last-updated';
import type { TOCItemType } from "fumadocs-core/toc";

interface DocsPageData {
  body: any;
  toc: TOCItemType[];
  full: boolean;
  title: string;
  description?: string;
  authors?: string[];
}


// Helper function to normalize doc file paths
function normalizeDocPath(path: string): string {
  let normalized = path.startsWith('content/') ? path : `content/${path}`;
  if (!normalized.startsWith('content/docs/')) {
    normalized = normalized.replace(/^content\//, 'content/docs/');
  }
  return normalized;
}

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const pageData = page.data as DocsPageData;
  const MDX = pageData.body;
  const filePath = normalizeDocPath(page.path ?? '');

  return (
    <DocsPage toc={pageData.toc} full={pageData.full}>
      <DocsTitle>{pageData.title}</DocsTitle>
      <DocsDescription className="!mb-2 text-base">{pageData.description}</DocsDescription>
      {pageData.authors && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <span>Author:</span>
          {pageData.authors.map((author: string) => (
            <Link
              key={author}
              href={`https://github.com/${author}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              {author}
            </Link>
          ))}
        </div>
      )}
      <DocsBody>
        <MDX
          components={getMDXComponents({
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

export async function generateMetadata(
  props: PageProps<'/docs/[[...slug]]'>,
): Promise<Metadata> {
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
