export const Tags = {
  // Languages
  Go: { label: "Go", description: "Go language", color: "#00ADD8" },
  Java: { label: "Java", description: "Java language", color: "#007396" },
  NodeJS: { label: "Node.js", description: "NodeJS runtime", color: "#339933" },
  PHP: { label: "PHP", description: "PHP language", color: "#777BB4" },
  Python: { label: "Python", description: "Python language", color: "#3776AB" },
  dotNET: { label: ".NET", description: ".NET runtime", color: "#512BD4" },
  Rust: { label: "Rust", description: "Rust language", color: "#000000" },
  Lua: { label: "Lua", description: "Lua language", color: "#000080" },
  Swift: { label: "Swift", description: "Swift language", color: "#FA7343" },
  Ruby: { label: "Ruby", description: "Ruby language", color: "#CC342D" },
  Cpp: { label: "C++", description: "C++ language", color: "#00599C" },
  // Plugin Types
  Adapter: { label: "Adapter", description: "Policy storage adapters", color: "#FFC107" },
  Dispatcher: { label: "Dispatcher", description: "Distributed enforcement", color: "#FF9800" },
  Middleware: { label: "Middleware", description: "Web framework integration", color: "#9C27B0" },
  RoleManager: { label: "RoleManager", description: "Role hierarchy management", color: "#3F51B5" },
  Watcher: { label: "Watcher", description: "Policy change notifications", color: "#8BC34A" },
} as const;

export type TagType = keyof typeof Tags;
export const TagList = Object.keys(Tags) as TagType[];
export const LanguageTags: TagType[] = [
  "Go",
  "Java",
  "NodeJS",
  "PHP",
  "Python",
  "dotNET",
  "Rust",
  "Lua",
  "Swift",
  "Ruby",
  "Cpp",
];
export const PluginTypeTags: TagType[] = [
  "Adapter",
  "Middleware",
  "Watcher",
  "RoleManager",
  "Dispatcher",
];
