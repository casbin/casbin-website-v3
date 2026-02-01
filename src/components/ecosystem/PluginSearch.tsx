"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePluginFilter } from "./PluginFilterContext";

export function PluginSearch() {
  const { searchQuery, setSearchQuery } = usePluginFilter();

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search plugins..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}
