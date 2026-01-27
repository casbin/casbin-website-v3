import { blogSource } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  // Use DocsLayout for individual blog posts so they get the sidebar/navigation
  const options = baseOptions();
  // Remove logo from sidebar
  const blogNav = {
    ...options.nav,
    children: undefined,
  };
  return <DocsLayout tree={blogSource.pageTree} {...options} nav={blogNav}>{children}</DocsLayout>;
}
