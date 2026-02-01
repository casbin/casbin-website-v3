"use server";

import { source, getLLMText } from "./source";

export async function getMarkdownContent(pagePath: string): Promise<string> {
  try {
    // Get all pages from the source
    const pages = source.getPages();

    // Normalize the path - remove leading/trailing slashes and 'content/' prefix if present
    let normalizedPath = pagePath.replace(/^\/|\/$/g, "").replace(/^content\//, "");

    // Try to find a matching page
    // page.path from Fumadocs is typically in the format 'docs/...' or similar
    const candidates = [
      normalizedPath,
      normalizedPath.startsWith("docs/") ? normalizedPath : `docs/${normalizedPath}`,
    ];

    let page;
    for (const candidate of candidates) {
      page = pages.find((p) => p.path === candidate);
      if (page) break;
    }

    if (!page) {
      throw new Error(`Page not found: ${pagePath}`);
    }

    // Get the formatted markdown content with metadata (title, URL, source, description)
    const content = await getLLMText(page as Parameters<typeof getLLMText>[0]);
    return content;
  } catch (error) {
    const err = error as { message?: string };
    throw new Error(`Failed to get markdown content: ${err.message || "unknown error"}`);
  }
}
