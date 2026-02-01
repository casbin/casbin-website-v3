import { blogSource } from "@/lib/source";
import type { Metadata } from "next";
import type { InferPageType } from "fumadocs-core/source";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Latest updates and news from Casbin",
};

type BlogPage = InferPageType<typeof blogSource>;

export default function Page() {
  const pages: BlogPage[] = blogSource.getPages();

  return (
    <>
      <div className="w-full px-6 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-lg w-full bg-[linear-gradient(135deg,#1a1a2e_0%,#443D80_25%,#6B5B95_50%,#443D80_75%,#2d1b4e_100%)] bg-cover bg-center">
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
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3 xl:grid-cols-4">
            {pages.map((page) => (
              <Link
                key={page.slugs.join("/")}
                href={`/blog/${page.slugs.join("/")}`}
                className="flex flex-col bg-white/80 backdrop-blur-sm rounded-2xl border shadow-sm p-4 transition-colors hover:bg-accent hover:text-accent-foreground hover:shadow-lg"
                aria-label={`Read ${page.data.title}${page.data.date ? ` - Published ${new Date(page.data.date).toDateString()}` : ""}`}
              >
                <p className="font-medium">{page.data.title}</p>
                {page.data.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{page.data.description}</p>
                )}

                {page.data.date && (
                  <time
                    dateTime={new Date(page.data.date).toISOString()}
                    className="mt-auto pt-4 text-xs text-[color:var(--brand-primary)]"
                  >
                    {new Date(page.data.date).toDateString()}
                  </time>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
