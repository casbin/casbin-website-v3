import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { LinkItem } from 'fumadocs-ui/layouts/shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout 
      {...baseOptions()}
      links={[
        {
          type: 'main',
          url: '/docs',
          text: 'Docs',
        },
        {
          type: 'main',
          url: '/docs/PluginsOverview',
          text: 'Plugins',
        },
        {
          type: 'main',
          url: '/docs/SupportedModels',
          text: 'Authorization Models',
        },
        {
          type: 'main',
          url: 'https://editor.casbin.org',
          text: 'GUI Policy Editor',
          external: true,
        },
        {
          type: 'main',
          url: '/blog',
          text: 'Blog',
        },
        {
          type: 'main',
          url: '/docs/Contributing',
          text: 'Help',
        },
      ]}
      className="[--fd-navbar-gap:2rem]"
      >
        {children}
    </HomeLayout>
  );
}
