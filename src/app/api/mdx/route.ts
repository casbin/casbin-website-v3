import { NextResponse } from 'next/server';
import { source } from '@/lib/source';

// Define proper types for page data
type PageItem = {
  path: string;
  data: {
    getText: (type: 'raw' | 'processed') => Promise<string>;
  };
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const p = url.searchParams.get('path');
    if (!p) return NextResponse.json({ error: 'missing path' }, { status: 400 });

    const decoded = decodeURIComponent(p).replace(/\+/g, '/').replace(/^\//, '');

    // prevent path traversal
    if (decoded.includes('..')) return NextResponse.json({ error: 'invalid path' }, { status: 400 });

    // Try to find a page by matching its `page.path` to the requested path.
    // Accept both `docs/...` and bare `...` forms.
    const pages = source.getPages();
    const candidates = [decoded, decoded.startsWith('docs/') ? undefined : `docs/${decoded}`].filter(Boolean) as string[];

    let page: PageItem | undefined;
    for (const c of candidates) {
      page = pages.find((pItem) => pItem.path === c || pItem.path === decodeURIComponent(c)) as PageItem | undefined;
      if (page) break;
    }

    if (!page) {
      return NextResponse.json({ error: `not found: tried ${candidates.join(', ')}` }, { status: 404 });
    }

    // Use the source page API to get the raw file contents. This delegates
    // reading to the source layer and works regardless of how paths are
    // normalized by the loader.
    const raw = await page.data.getText('raw');

    return new Response(raw, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (err: unknown) {
    const error = err as { message?: string };
    return NextResponse.json({ error: error?.message ?? 'not found' }, { status: 404 });
  }
}
