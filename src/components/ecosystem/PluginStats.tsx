"use client";

import { useMemo } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { allPlugins } from "@/data/plugins";
import { Package, Zap, Eye, Users, Share2, GitBranch } from "lucide-react";

export function PluginStats() {
  const stats = useMemo(() => {
    const stats: Record<string, number> = {
      total: allPlugins.length,
    };

    // Count by plugin type (Adapter, Middleware, etc.)
    for (const plugin of allPlugins) {
      plugin.tags.forEach((tag) => {
        if (["Adapter", "Middleware", "Watcher", "RoleManager", "Dispatcher"].includes(tag)) {
          stats[tag] = (stats[tag] || 0) + 1;
        }
      });
    }

    return stats;
  }, []);

  const categories = [
    { label: "Adapter", color: "#EF4444", icon: Package },
    { label: "Middleware", color: "#F59E0B", icon: Zap },
    { label: "Watcher", color: "#10B981", icon: Eye },
    { label: "RoleManager", color: "#3B82F6", icon: Users },
    { label: "Dispatcher", color: "#8B5CF6", icon: Share2 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {/* Total */}
      <StatCard icon={GitBranch} iconColor="#443D80" value={stats.total} label="Total Plugins" />

      {/* Individual Categories */}
      {categories.map((category) => {
        const count = stats[category.label] || 0;
        return (
          <StatCard
            key={category.label}
            icon={category.icon}
            iconColor={category.color}
            value={count}
            label={`${category.label}s`}
          />
        );
      })}
    </div>
  );
}
