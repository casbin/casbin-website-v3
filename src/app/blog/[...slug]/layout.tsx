import { blogSource } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  // Use DocsLayout for individual blog posts but disable the sidebar
  return (
    <DocsLayout
      tree={blogSource.pageTree}
      {...baseOptions()}
      sidebar={{ enabled: false }}
    >
      {children}
    </DocsLayout>
  );
}
