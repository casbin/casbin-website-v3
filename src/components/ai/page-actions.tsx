'use client';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Check, ChevronDown, Copy, ExternalLinkIcon, MessageCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { buttonVariants } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cva } from 'class-variance-authority';
import { getMarkdownContent } from '@/lib/get-markdown-content';

const cache = new Map<string, string>();

// Helper function to normalize doc file paths to GitHub URL format
function normalizeDocPathForGithub(path: string): string {
  let normalized = path.startsWith('content/') ? path : `content/${path}`;
  if (!normalized.startsWith('content/docs/')) {
    normalized = normalized.replace(/^content\//, 'content/docs/');
  }
  return normalized;
}

export function LLMCopyButton({
  /**
   * The page path for fetching the raw Markdown/MDX content
   */
  pagePath,
}: {
  pagePath: string;
}) {
  const [isLoading, setLoading] = useState(false);
  const [checked, onClick] = useCopyButton(async () => {
    try {
      setLoading(true);
      const cached = cache.get(pagePath);
      const content = cached || await getMarkdownContent(pagePath);

      if (!cached) {
        cache.set(pagePath, content);
      }

      await navigator.clipboard.writeText(content);
    } catch (error) {
      console.error("Failed to copy markdown to clipboard:", error);
      window.alert("Failed to copy the markdown to your clipboard. Please copy it manually.");
      throw error;
    } finally {
      setLoading(false);
    }
  });

  return (
    <button
      disabled={isLoading}
      className={cn(
        buttonVariants({
          variant: 'secondary',
          size: 'sm',
          className: 'gap-2 [&_svg]:size-3.5 [&_svg]:text-fd-muted-foreground',
        }),
      )}
      onClick={onClick}
    >
      {checked ? <Check /> : <Copy />}
      Copy Markdown
    </button>
  );
}

const optionVariants = cva(
  'text-sm p-2 rounded-lg inline-flex items-center gap-2 hover:text-fd-accent-foreground hover:bg-fd-accent [&_svg]:size-4',
);

export function ViewOptions({
  pagePath,
  githubUrl,
}: {
  /**
   * The page path for accessing page content
   */
  pagePath: string;

  /**
   * Source file URL on GitHub
   */
  githubUrl: string;
}) {
  const items = useMemo(() => {
    const q = `Read ${githubUrl}, I want to ask questions about it.`;

    return [
      {
        title: 'Open in GitHub',
        href: githubUrl,
        icon: (
          <Image src="/ai-icons/github.svg" alt="GitHub" width={16} height={16} className="size-4" />
        ),
      },
      {
        title: 'Open in Scira AI',
        href: `https://scira.ai/?${new URLSearchParams({
          q,
        })}`,
        icon: (
          <Image src="/ai-icons/scira-ai.svg" alt="Scira AI" width={16} height={16} className="size-4" />
        ),
      },
      {
        title: 'Open in ChatGPT',
        href: `https://chatgpt.com/?${new URLSearchParams({
          hints: 'search',
          q,
        })}`,
        icon: (
          <Image src="/ai-icons/openai.svg" alt="OpenAI" width={16} height={16} className="size-4" />
        ),
      },
      {
        title: 'Open in Claude',
        href: `https://claude.ai/new?${new URLSearchParams({
          q,
        })}`,
        icon: (
          <Image src="/ai-icons/anthropic.svg" alt="Anthropic" width={16} height={16} className="size-4" />
        ),
      },
      {
        title: 'Open in T3 Chat',
        href: `https://t3.chat/new?${new URLSearchParams({
          q,
        })}`,
        icon: <MessageCircleIcon />,
      },
    ];
  }, [githubUrl]);

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({
            variant: 'secondary',
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
          <a
            key={item.href}
            href={item.href}
            rel="noreferrer noopener"
            target="_blank"
            className={cn(optionVariants())}
          >
            {item.icon}
            {item.title}
            <ExternalLinkIcon className="text-fd-muted-foreground size-3.5 ms-auto" />
          </a>
        ))}
      </PopoverContent>
    </Popover>
  );
}