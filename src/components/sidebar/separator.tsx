"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Separator } from "fumadocs-core/page-tree";
import { useFolderDepth } from "fumadocs-ui/components/sidebar/base";

// Category separator to URL mapping - exact match for tree names
const categoryUrls: Record<string, string> = {
  "The basics": "/docs/category/the-basics",
  Model: "/docs/category/model",
  Storage: "/docs/category/storage",
  Scenarios: "/docs/category/scenarios",
  Plugins: "/docs/category/plugins",
  API: "/docs/category/api",
  "Advanced usage": "/docs/category/advanced-usage",
  Management: "/docs/category/management",
  Editor: "/docs/category/editor",
  More: "/docs/category/more",
};

interface SidebarSeparatorProps {
  item: Separator;
  className?: string;
  style?: React.CSSProperties;
}

export function SidebarSeparator({ item, className, style }: SidebarSeparatorProps) {
  const pathname = usePathname();
  const name = typeof item.name === "string" ? item.name : "";
  const categoryUrl = categoryUrls[name];

  if (categoryUrl) {
    const isActive = pathname === categoryUrl;

    return (
      <Link
        href={categoryUrl}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-foreground/70 hover:text-foreground hover:bg-fumadocs-sidebar-hover rounded-md transition-colors",
          isActive && "text-foreground bg-fumadocs-sidebar-hover",
          className,
        )}
        style={style}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <span
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
        className,
      )}
      style={style}
    >
      {item.name}
    </span>
  );
}
