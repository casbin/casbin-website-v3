import { getPageImage, getLocalizedSource } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { generate as DefaultImage } from "fumadocs-ui/og";

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<"/[locale]/og/docs/[...slug]">) {
  const { slug, locale } = await params;
  const source = getLocalizedSource(locale);
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return new ImageResponse(
    <DefaultImage title={page.data.title} description={page.data.description} site="Casbin" />,
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  const locales = ["en", "zh", "ja", "ko", "fr", "de", "es", "ru", "ar", "pt", "it", "tr", "id", "th", "ms", "uk", "vi"];
  const params = [];
  
  for (const locale of locales) {
    const source = getLocalizedSource(locale);
    const localeParams = source.getPages().map((page) => ({
      locale,
      slug: getPageImage(page).segments,
    }));
    params.push(...localeParams);
  }
  
  return params;
}
