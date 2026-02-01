import type { Metadata } from "next";
import { PluginFilterProvider } from "@/components/ecosystem/PluginFilterContext";
import { PluginSearch } from "@/components/ecosystem/PluginSearch";
import { PluginFilters } from "@/components/ecosystem/PluginFilters";
import { PluginGrid } from "@/components/ecosystem/PluginGrid";
import { PluginStats } from "@/components/ecosystem/PluginStats";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Github, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Casbin Ecosystem - 243+ Plugins",
  description:
    "Discover adapters, watchers, role managers, middlewares, and dispatchers for Casbin across 11 programming languages",
};

export default function EcosystemPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <PluginFilterProvider>
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#443D80]/10 via-transparent to-[#6B5B95]/10" />
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-slate-700/25" />

          <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
            <div className="text-center mb-12 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#443D80]/10 border border-[#443D80]/20 mb-4">
                <Sparkles className="h-4 w-4 text-[#443D80]" />
                <span className="text-sm font-medium text-[#443D80]">243+ Plugins & Growing</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-[#443D80] via-[#6B5B95] to-[#443D80] bg-clip-text text-transparent">
                  Casbin Ecosystem
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A comprehensive collection of <strong>adapters</strong>,{" "}
                <strong>middlewares</strong>, <strong>watchers</strong>, and more — supporting{" "}
                <strong>11 programming languages</strong>
              </p>

              <div className="flex items-center justify-center gap-4 pt-4">
                <Tooltip delayDuration={500}>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://github.com/casbin/casbin-website-v3"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="lg" className="gap-2 bg-[#443D80] hover:bg-[#6B5B95]">
                        <Github className="h-5 w-5" />
                        Contribute a Plugin
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <div className="space-y-1">
                      <p className="font-medium">Contribute Guide:</p>
                      <p className="text-sm">1. Fork repo → 2. Add plugin data → 3. PR</p>
                      <p className="text-xs text-muted-foreground">
                        See src/data/plugins/README.md
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Stats Overview */}
            <PluginStats />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
          {/* Search & Filters */}
          <div className="sticky top-16 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-y py-6 -mx-6 px-6 mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <PluginSearch />
              <div className="text-sm text-muted-foreground">
                Use filters below to find the perfect plugin for your project
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar Filters */}
            <aside className="space-y-6">
              <PluginFilters />
            </aside>

            {/* Plugin Grid */}
            <main>
              <PluginGrid />
            </main>
          </div>
        </div>
      </PluginFilterProvider>
    </div>
  );
}
