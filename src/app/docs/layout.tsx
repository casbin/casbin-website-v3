import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const base = baseOptions();

  // Override nav for docs only: move logo into `nav.title` so it sits left
  const docsNav = {
    ...base.nav,
    title: (
      <img
        src="https://cdn.casbin.org/img/casbin_logo_1024x256.png"
        alt="Casbin"
        className="h-8 object-contain"
      />
    ),
    children: undefined,
  };

  return (
    <DocsLayout
      tree={source.pageTree}
      {...base}
      nav={docsNav}
      sidebar={{
        collapsible: true,
        defaultOpenLevel: 1,
      }}
    >
      {children}
    </DocsLayout>
  );
}
