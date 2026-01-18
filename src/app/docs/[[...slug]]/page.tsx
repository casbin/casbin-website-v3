import { getPageImage, source } from '@/lib/source';
import { LLMCopyButton, ViewOptions } from '@/components/ai/page-actions';
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
import * as Twoslash from 'fumadocs-twoslash/ui';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = (page.data as any).body;

  return (
    <DocsPage toc={(page.data as any).toc} full={(page.data as any).full}>
      <DocsTitle>{(page.data as any).title}</DocsTitle>
      <DocsDescription className="!mb-2 text-base">{(page.data as any).description}</DocsDescription>
      {/* <AuthorCard authorInfo={page.data as any} /> */}
      <div className="flex flex-row gap-2 items-center border-b pt-1 pb-4">
        {(() => {
          const p = page.path ?? '';
          let normalized = p.startsWith('content/') ? p : `content/${p}`;
          if (!normalized.startsWith('content/docs/')) {
            normalized = normalized.replace(/^content\//, 'content/docs/');
          }
          const githubUrl = `https://github.com/casbin/casbin-website-v3/blob/master/${normalized}`;

          return (
            <>
              <LLMCopyButton
                markdownUrl={`/api/mdx?path=${encodeURIComponent(page.path)}`}
                githubUrl={githubUrl}
                pagePath={page.path}
                title={page.data.title}
                description={page.data.description}
              />
              <ViewOptions
                markdownUrl={`/api/mdx?path=${encodeURIComponent(page.path)}`}
                githubUrl={githubUrl}
              />
            </>
          );
        })()}
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            ...Twoslash,
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
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
