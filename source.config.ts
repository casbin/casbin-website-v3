import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from "fumadocs-mdx/config";
import { z } from "zod";
import { remarkFeedbackBlock } from "fumadocs-core/mdx-plugins/remark-feedback-block";

// i18n configuration
const i18n = {
  defaultLanguage: "en",
  languages: ["en", "zh", "ja", "ko", "fr", "de", "es", "ru", "ar", "pt", "it", "tr", "id", "th", "ms", "uk", "vi"],
};

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      authors: z.array(z.string()).optional(),
      date: z.string().date().or(z.date()).optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
  i18n,
});

export const blog = defineDocs({
  dir: "content/blog",
  docs: {
    schema: frontmatterSchema.extend({
      author: z.string().optional(),
      authorTitle: z.string().optional(),
      authorURL: z.string().optional(),
      authorImageURL: z.string().optional(),
      date: z.string().date().or(z.date()).optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
  i18n,
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkFeedbackBlock],
  },
});
