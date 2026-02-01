"use client";

import { useMemo } from "react";
import { ColorBadge } from "@/components/ui/color-badge";
import { Tags, type TagType, LanguageTags, PluginTypeTags } from "@/data/plugins/tags";
import { usePluginFilter } from "./PluginFilterContext";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allPlugins } from "@/data/plugins";

export function PluginFilters() {
  const { selectedTags, toggleTag, filteredPlugins } = usePluginFilter();
  const hasFilters = selectedTags.size > 0;

  // Calculate tag counts - based on all plugins to show total counts
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    for (const plugin of allPlugins) {
      for (const tag of plugin.tags) {
        counts[tag] = (counts[tag] || 0) + 1;
      }
    }

    return counts;
  }, []);

  // Get unique plugin types and languages
  const categoryList = useMemo(() => {
    return PluginTypeTags;
  }, []);

  const languages = useMemo(() => {
    const langs = new Set<string>();
    for (const plugin of allPlugins) {
      for (const tag of plugin.tags) {
        const tagKey = Object.keys(Tags).find((k) => Tags[k as TagType].label === tag);
        if (tagKey && LanguageTags.includes(tagKey as TagType)) {
          langs.add(tag);
        }
      }
    }
    return Array.from(langs).sort();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <div>
            <h3 className="font-semibold text-lg">Filters</h3>
            <p className="text-sm text-muted-foreground">
              {filteredPlugins.length} {filteredPlugins.length === 1 ? "result" : "results"}
            </p>
          </div>
        </div>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const tagsToToggle = Array.from(selectedTags);
              tagsToToggle.forEach((tag) => toggleTag(tag));
            }}
            className="gap-1 text-xs"
          >
            <X className="h-3 w-3" />
            Clear
          </Button>
        )}
      </div>

      {/* Languages */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Languages
        </h4>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => {
            // Find the TagType key for this language
            const tagKey = Object.keys(Tags).find(
              (k) => Tags[k as TagType].label === lang,
            ) as TagType;
            const tagInfo = tagKey ? Tags[tagKey] : null;
            const color = tagInfo?.color || "#6B7280";
            const isSelected = Array.from(selectedTags).some((t) => Tags[t].label === lang);
            const count = tagCounts[lang] || 0;

            return (
              <ColorBadge
                key={lang}
                color={color}
                isSelected={isSelected}
                className="cursor-pointer transition-all hover:scale-105 px-3 py-1.5"
                onClick={() => {
                  if (tagKey) toggleTag(tagKey);
                }}
              >
                {lang} <span className="text-xs opacity-75 ml-1">({count})</span>
              </ColorBadge>
            );
          })}
        </div>
      </div>

      {/* Plugin Types */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Categories
        </h4>
        <div className="flex flex-wrap gap-2">
          {categoryList.map((cat) => {
            const tagInfo = Tags[cat];
            const isSelected = selectedTags.has(cat);
            const count = tagCounts[tagInfo.label] || 0;

            return (
              <ColorBadge
                key={cat}
                color={tagInfo.color}
                isSelected={isSelected}
                className="cursor-pointer transition-all hover:scale-105 px-3 py-1.5 gap-1"
                onClick={() => toggleTag(cat)}
              >
                <span>{tagInfo.label}</span>
                <span className="text-xs opacity-75">({count})</span>
              </ColorBadge>
            );
          })}
        </div>
      </div>
    </div>
  );
}
