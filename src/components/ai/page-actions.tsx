"use client";

import { useMemo } from 'react';
import { Check, ChevronDown, Copy, ExternalLinkIcon, MessageCircleIcon, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover';
import { cva } from 'class-variance-authority';

const cache = new Map<string, string>();

export function LLMCopyButton({
  /** A URL to fetch the raw Markdown/MDX content of page */
  markdownUrl,
  /** Source file URL on GitHub */
  githubUrl,
  /** page path from source, e.g. docs/api-overview.mdx */
  pagePath,
  title,
  description,
}: {
  markdownUrl: string;
  githubUrl?: string;
  pagePath?: string;
  title?: string;
  description?: string;
}) {
  const [checked, onClick] = useCopyButton(async () => {
    let content = cache.get(markdownUrl);
    if (!content) {
      const res = await fetch(markdownUrl);
      content = await res.text();
      cache.set(markdownUrl, content);
    }

    // strip YAML frontmatter if present
    const stripped = content.replace(/^---\s*[\s\S]*?---\s*/i, '').trim();

    // derive a relative docs URL from pagePath (use last segment)
    let relativeUrl = '/docs';
    if (pagePath) {
      const last = pagePath.split('/').pop() || pagePath;
      const name = last.replace(/\.mdx?$/i, '');
      relativeUrl = `/docs/${name}`;
    }

    const headerParts: string[] = [];
    if (title) headerParts.push(`# Casbin：${title}`);
    headerParts.push(`URL：${relativeUrl}`);
    if (githubUrl) headerParts.push(`Source: ${githubUrl}`);
    if (description) headerParts.push(`\n${description}`);

    const full = `${headerParts.join('\n')}
\n${stripped}`.trim();

    await navigator.clipboard.writeText(full);
  });

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({
          color: 'secondary',
          size: 'sm',
          className: 'gap-2 [&_svg]:size-3.5 [&_svg]:text-fd-muted-foreground',
        }),
      )}
    >
      {checked ? <Check /> : <Copy />}
      Copy Markdown
    </button>
  );
}

const optionVariants = cva('text-sm p-2 rounded-lg inline-flex items-center gap-2 hover:text-fd-accent-foreground hover:bg-fd-accent [&_svg]:size-4');

export function ViewOptions({
  markdownUrl,
  githubUrl,
}: {
  /** A URL to the raw Markdown/MDX content of page */
  markdownUrl: string;
  /** Source file URL on GitHub */
  githubUrl: string;
}) {
  const items = useMemo(() => {
    const fullMarkdownUrl = typeof window !== 'undefined' ? new URL(markdownUrl, window.location.origin) : 'loading';
    const q = `Read ${fullMarkdownUrl}, I want to ask questions about it.`;

    return [
      {
        title: 'Open in GitHub',
        href: githubUrl,
        icon: <ExternalLinkIcon />,
      },
      {
        title: 'Open in Scira AI',
        href: `https://scira.ai/?${new URLSearchParams({ q })}`,
        icon: <Rocket />,
      },
      {
        title: 'Open in ChatGPT',
        href: `https://chatgpt.com/?${new URLSearchParams({ hints: 'search', q })}`,
        icon: <ExternalLinkIcon />,
      },
      {
        title: 'Open in Claude',
        href: `https://claude.ai/new?${new URLSearchParams({ q })}`,
        icon: <ExternalLinkIcon />,
      },
      {
        title: 'Open in T3 Chat',
        href: `https://t3.chat/new?${new URLSearchParams({ q })}`,
        icon: <MessageCircleIcon />,
      },
    ];
  }, [githubUrl, markdownUrl]);

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({
            color: 'secondary',
            size: 'sm',
            className: 'gap-2',
          }),
        )}
      >
        Open
        <ChevronDown className="size-3.5 text-fd-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col">
        {items.map((item) => (
          <a key={item.href} href={item.href} rel="noreferrer noopener" target="_blank" className={cn(optionVariants())}>
            {item.icon}
            {item.title}
            <ExternalLinkIcon className="text-fd-muted-foreground size-3.5 ms-auto" />
          </a>
        ))}
      </PopoverContent>
    </Popover>
  );
}
