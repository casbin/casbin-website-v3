"use client";

import { createContext, useContext, useState, useMemo } from "react";
import type { Plugin } from "@/data/plugins";
import type { TagType } from "@/data/plugins/tags";
import { sortedPlugins } from "@/data/plugins";
import { LanguageTags, PluginTypeTags } from "@/data/plugins/tags";

interface PluginFilterContextType {
  selectedTags: Set<TagType>;
  toggleTag: (tag: TagType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredPlugins: Plugin[];
}

const PluginFilterContext = createContext<PluginFilterContextType | undefined>(undefined);

export function PluginFilterProvider({ children }: { children: React.ReactNode }) {
  const [selectedTags, setSelectedTags] = useState<Set<TagType>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const toggleTag = (tag: TagType) => {
    setSelectedTags((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tag)) {
        newSet.delete(tag);
      } else {
        newSet.add(tag);
      }
      return newSet;
    });
  };

  const filteredPlugins = useMemo(() => {
    let result = sortedPlugins;

    // Filter by tags - Union within same category, Intersection between categories
    if (selectedTags.size > 0) {
      const selectedTagsArray = Array.from(selectedTags);

      // Separate tags into languages and plugin types
      const selectedLanguages = selectedTagsArray.filter((tag) => LanguageTags.includes(tag));
      const selectedTypes = selectedTagsArray.filter((tag) => PluginTypeTags.includes(tag));

      result = result.filter((plugin) => {
        // If languages are selected, plugin must match at least one (OR within category)
        const matchesLanguage =
          selectedLanguages.length === 0 ||
          selectedLanguages.some((lang) => plugin.tags.includes(lang));

        // If types are selected, plugin must match at least one (OR within category)
        const matchesType =
          selectedTypes.length === 0 || selectedTypes.some((type) => plugin.tags.includes(type));

        // Must satisfy both conditions (AND between categories)
        return matchesLanguage && matchesType;
      });
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (plugin) =>
          plugin.title.toLowerCase().includes(query) ||
          plugin.description.toLowerCase().includes(query),
      );
    }

    return result;
  }, [selectedTags, searchQuery]);

  return (
    <PluginFilterContext.Provider
      value={{
        selectedTags,
        toggleTag,
        searchQuery,
        setSearchQuery,
        filteredPlugins,
      }}
    >
      {children}
    </PluginFilterContext.Provider>
  );
}

export function usePluginFilter() {
  const context = useContext(PluginFilterContext);
  if (!context) {
    throw new Error("usePluginFilter must be used within PluginFilterProvider");
  }
  return context;
}
