import { blogSource } from '@/lib/source';
import type { Metadata } from 'next';
import Link from 'next/link';

// Define proper type for blog page data
type BlogPageData = {
  title: string;
  description?: string;
  date?: string;
};

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest updates and news from Casbin',
};

export default function Page() {
  const pages = blogSource.getPages();

  return (
    <>
      <div className="w-full px-6 mt-12">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl shadow-lg w-full bg-[linear-gradient(135deg,#1a1a2e_0%,#443D80_25%,#6B5B95_50%,#443D80_75%,#2d1b4e_100%)] bg-cover bg-center"
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
            <div className="relative z-10 max-w-full px-6 py-24 md:py-32">
              <h1 className="text-4xl md:text-5xl font-medium text-white font-mono">Casbin Blog</h1>
              <p className="mt-4 text-sm text-white/85">Latest announcements of Casbin.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="w-full px-6 mt-12 mb-12">
        <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pages.map((page) => {
            const data = page.data as BlogPageData;
            return (
              <article key={page.slugs.join('/')} className="bg-white/80 backdrop-blur-sm border rounded-lg p-4 shadow-sm">
                <h2 className="text-lg font-semibold">
                  <Link href={`/blog/${page.slugs.join('/')}`} className="hover:underline">
                    {data.title}
                  </Link>
                </h2>
                {data.description && (
                  <p className="text-muted-foreground mt-2">
                    {data.description}
                  </p>
                )}
                {data.date && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {new Date(data.date).toLocaleDateString()}
                  </p>
                )}
              </article>
            );
          })}
        </div>
        </div>
      </section>
    </>
  );
}