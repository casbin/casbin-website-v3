import { NextResponse } from 'next/server';
import { source } from '@/lib/source';
import path from 'path';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const p = url.searchParams.get('path');
    if (!p) return NextResponse.json({ error: 'missing path' }, { status: 400 });

    const decoded = decodeURIComponent(p).replace(/\\+/g, '/').replace(/^\//, '');

    // prevent path traversal
    if (decoded.includes('..') || decoded.includes('\0') || path.isAbsolute(decoded)) {
        return NextResponse.json({ error: 'invalid path' }, { status: 400 });
    }

    // Try to find a page by matching its `page.path` to the requested path.
    // Accept both `docs/...` and bare `...` forms.
    const pages = source.getPages();
    const candidates = [decoded, decoded.startsWith('docs/') ? undefined : `docs/${decoded}`].filter(Boolean) as string[];

    let page: any | undefined;
    for (const c of candidates) {
      page = pages.find((pItem: any) => pItem.path === c || pItem.path === decodeURIComponent(c));
      if (page) break;
    }

    if (!page) {
      return NextResponse.json({ error: 'not found' }, { status: 404 });
    }

    // Use the source page API to get the raw file contents. This delegates
    // reading to the source layer and works regardless of how paths are
    // normalized by the loader.
    const raw = await page.data.getText('raw');

    return new Response(raw, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'not found' }, { status: 404 });
  }
}
