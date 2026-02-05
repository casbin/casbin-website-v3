"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PageInfo {
  url: string;
  data: {
    title: string;
    description?: string;
  };
}

interface PrevNextProps {
  pages: PageInfo[];
  currentUrl: string;
}

export function PrevNext({ pages, currentUrl }: PrevNextProps) {
  const currentIndex = pages.findIndex((page) => page.url === currentUrl);

  const previousPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  if (!previousPage && !nextPage) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      {previousPage ? (
        <Link href={previousPage.url} className="block group">
          <Card className="h-full transition-all hover:shadow-md hover:border-primary group-hover:-translate-y-1">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ChevronLeft className="size-4" />
                Previous
              </div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                {previousPage.data.title}
              </CardTitle>
              {previousPage.data.description && (
                <CardDescription className="line-clamp-2">
                  {previousPage.data.description}
                </CardDescription>
              )}
            </CardHeader>
          </Card>
        </Link>
      ) : null}

      {nextPage ? (
        <Link href={nextPage.url} className="block group">
          <Card className="h-full transition-all hover:shadow-md hover:border-primary group-hover:-translate-y-1">
            <CardHeader className="pb-2 text-right">
              <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
                Next
                <ChevronRight className="size-4" />
              </div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                {nextPage.data.title}
              </CardTitle>
              {nextPage.data.description && (
                <CardDescription className="line-clamp-2">
                  {nextPage.data.description}
                </CardDescription>
              )}
            </CardHeader>
          </Card>
        </Link>
      ) : null}
    </div>
  );
}
