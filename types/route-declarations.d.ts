declare module "../../../src/app/api/mdx/route.js" {
  import type { NextRequest } from 'next/server';
  export function GET(request: NextRequest): Promise<Response> | Response;
}

declare module "../../../src/app/api/mdx/route" {
  import type { NextRequest } from 'next/server';
  export function GET(request: NextRequest): Promise<Response> | Response;
}
