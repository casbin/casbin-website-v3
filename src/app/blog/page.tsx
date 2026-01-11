import { blogSource } from '@/lib/source';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest updates and news from Casbin',
};

export default function Page() {
  const pages = blogSource.getPages();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="text-muted-foreground">
        Latest updates and news from Casbin
      </p>
      <div className="grid gap-4">
        {pages.map((page) => (
          <article key={page.slugs.join('/')} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${page.slugs.join('/')}`} className="hover:underline">
                {page.data.title}
              </Link>
            </h2>
            {page.data.description && (
              <p className="text-muted-foreground mt-2">
                {page.data.description}
              </p>
            )}
            {page.data.date && (
              <p className="text-sm text-muted-foreground mt-2">
                {new Date(page.data.date).toLocaleDateString()}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}