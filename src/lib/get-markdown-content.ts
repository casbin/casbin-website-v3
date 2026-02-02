"use server";

import { source, getLLMText } from "./source";

export async function getMarkdownContent(slugs: string[]): Promise<string> {
  try {
    // Use slugs to get the page directly from the source
    const page = source.getPage(slugs);

    if (!page) {
      throw new Error(`Page not found for slugs: ${slugs.join("/")}`);
    }

    const content = await getLLMText(page as Parameters<typeof getLLMText>[0]);
    return content;
  } catch (error) {
    const err = error as { message?: string };
    throw new Error(`Failed to get markdown content: ${err.message || "unknown error"}`);
  }
}
