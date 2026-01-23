"use client";

import * as React from "react";
import Link from "next/link";
import { ShareButton } from "./ShareButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogPostActionsProps {
  url: string;
  className?: string;
}

export function BlogPostActions({ url, className }: BlogPostActionsProps) {
  return (
    <div className={cn("flex flex-row gap-3 mb-8 not-prose", className)}>
      <ShareButton url={url} />
      <Link
        href="/blog"
        className={buttonVariants({
          variant: "secondary",
          className: "hover:shadow-md",
        })}
      >
        Back
      </Link>
    </div>
  );
}
