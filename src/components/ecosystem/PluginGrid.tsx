"use client";

import { PluginCard } from "./PluginCard";
import { usePluginFilter } from "./PluginFilterContext";

export function PluginGrid() {
  const { filteredPlugins } = usePluginFilter();

  if (filteredPlugins.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground mb-2">No plugins found</p>
        <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {filteredPlugins.length} {filteredPlugins.length === 1 ? "Plugin" : "Plugins"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlugins.map((plugin, index) => (
          <PluginCard key={`${plugin.title}-${index}`} plugin={plugin} />
        ))}
      </div>
    </div>
  );
}
