import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import type { LinkItemType } from "fumadocs-ui/layouts/shared";
import Link from "next/link";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "",
      enabled: true,
      children: (
        <Link href="/" className="inline-flex items-center gap-2 font-semibold text-lg">
          <img
            src="https://cdn.casbin.org/img/casbin_logo_1024x256.png"
            alt="Casbin"
            className="h-8 object-contain"
          />
        </Link>
      ),
    },
    githubUrl: "https://github.com/casbin/casbin",
  };
}

// Shared navigation links for all pages
export const sharedLinks: LinkItemType[] = [
  {
    type: "main",
    url: "/docs",
    text: "Docs",
  },
  {
    type: "main",
    url: "/ecosystem",
    text: "Plugins",
  },
  {
    type: "main",
    url: "/gallery",
    text: "Authorization Models",
  },
  {
    type: "main",
    url: "/editor",
    text: "GUI Policy Editor",
  },
  {
    type: "main",
    url: "/blog",
    text: "Blog",
  },
  {
    type: "main",
    url: "/help",
    text: "Help",
  },
];
