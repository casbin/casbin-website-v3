"use server";

import { source, getLLMText } from "./source";

export async function getMarkdownContent(pagePath: string): Promise<string> {
  try {
    console.log("[getMarkdownContent] Starting with pagePath:", pagePath);
    
    // Get all pages from the source
    const pages = source.getPages();
    console.log("[getMarkdownContent] Total pages available:", pages.length);

    // Normalize the path - remove leading/trailing slashes, 'content/' and 'docs/' prefixes
    // The fumadocs source is configured with dir: "content/docs", so page.path values
    // are relative to that directory (e.g., "model/mac/biba.mdx" for "content/docs/model/mac/biba.mdx")
    let normalizedPath = pagePath
      .replace(/^\/|\/$/g, "")
      .replace(/^content\//, "")
      .replace(/^docs\//, "");

    console.log("[getMarkdownContent] Normalized path:", normalizedPath);

    // Try to find a matching page
    // Try both with and without the .mdx extension
    const candidates = [normalizedPath, normalizedPath.replace(/\.mdx?$/, "")];

    console.log("[getMarkdownContent] Trying candidates:", candidates);
    console.log("[getMarkdownContent] Sample page paths:", pages.slice(0, 5).map(p => p.path));

    let page;
    for (const candidate of candidates) {
      page = pages.find((p) => p.path === candidate);
      if (page) {
        console.log("[getMarkdownContent] Found page with candidate:", candidate);
        break;
      }
    }

    if (!page) {
      const error = `Page not found: ${pagePath}. Tried candidates: ${candidates.join(", ")}. Available paths (first 10): ${pages.slice(0, 10).map(p => p.path).join(", ")}`;
      console.error("[getMarkdownContent]", error);
      throw new Error(error);
    }

    console.log("[getMarkdownContent] Calling getLLMText");
    // Get the formatted markdown content with metadata (title, URL, source, description)
    const content = await getLLMText(page as Parameters<typeof getLLMText>[0]);
    console.log("[getMarkdownContent] Successfully got content, length:", content.length);
    return content;
  } catch (error) {
    const err = error as { message?: string };
    console.error("[getMarkdownContent] Error:", err);
    throw new Error(`Failed to get markdown content: ${err.message || "unknown error"}`);
  }
}
