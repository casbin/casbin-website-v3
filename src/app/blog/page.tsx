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
    <>
      <div className="w-full px-6 mt-12">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl shadow-lg w-full"
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #443D80 25%, #6B5B95 50%, #443D80 75%, #2d1b4e 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
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
          {pages.map((page) => (
            <article key={page.slugs.join('/')} className="bg-white/80 backdrop-blur-sm border rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-semibold">
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
      </section>
    </>
  );
}