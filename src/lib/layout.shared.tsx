import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { LinkItemType } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: '',
      enabled: true,
      children: (
        <a href="/" className="inline-flex items-center gap-2 font-semibold text-lg">
          <img 
            src="https://cdn.casbin.org/img/casbin_logo_1024x256.png" 
            alt="Casbin" 
            className="h-8 object-contain"
          />
        </a>
      ),
    },
  };
}

// Shared navigation links for all pages
export const sharedLinks: LinkItemType[] = [
  {
    type: 'main',
    url: '/docs',
    text: 'Docs',
  },
  {
    type: 'main',
    url: '/ecosystem',
    text: 'Plugins',
  },
  {
    type: 'main',
    url: 'https://editor.casbin.org/gallery',
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
    url: '/help',
    text: 'Help',
  },
];
