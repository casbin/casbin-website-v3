import type { Plugin } from "./all-plugins";
import { allPlugins } from "./all-plugins";

// Export all plugins
export { allPlugins, type Plugin };

// Sort by title alphabetically
export function sortPlugins(plugins: Plugin[]): Plugin[] {
  return [...plugins].sort((a, b) => {
    // Extract clean title without markdown for sorting
    const cleanA = a.title.replace(/\[([^\]]+)\]\([^)]+\)/, "$1").toLowerCase();
    const cleanB = b.title.replace(/\[([^\]]+)\]\([^)]+\)/, "$1").toLowerCase();
    return cleanA.localeCompare(cleanB);
  });
}

export const sortedPlugins = sortPlugins(allPlugins);
