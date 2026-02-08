import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Redirect /docs/category/{category} to the first document in that category.
 * E.g., /docs/category/model -> /docs/supported-models
 *
 * Middleware intercepts requests before they reach the page,
 * making it the ideal place for URL redirects.
 */
const categoryFirstPages: Record<string, string> = {
  "the-basics": "overview",
  model: "supported-models",
  storage: "model-storage",
  scenarios: "data-permissions",
  plugins: "plugins-overview",
  api: "api-overview",
  "advanced-usage": "multi-threading",
  management: "admin-portal",
  editor: "online-editor",
  more: "adopters",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const match = pathname.match(/^\/docs\/category\/([^\/]+)$/);
  if (match) {
    const category = match[1];
    const firstPage = categoryFirstPages[category];

    if (firstPage) {
      const url = request.nextUrl.clone();
      url.pathname = `/docs/${firstPage}`;
      return NextResponse.redirect(url, 307);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/docs/category/:path*"],
};
