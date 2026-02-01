"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ColorBadge } from "@/components/ui/color-badge";
import { Tags, type TagType } from "@/data/plugins/tags";
import type { Plugin } from "@/data/plugins";
import { ExternalLink, Check, X, Package } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface PluginCardProps {
  plugin: Plugin;
}

export function PluginCard({ plugin }: PluginCardProps) {
  // Extract link from markdown title [text](url)
  const titleMatch = plugin.title.match(/\[([^\]]+)\]\(([^)]+)\)/);
  const title = titleMatch ? titleMatch[1] : plugin.title;
  const link = titleMatch ? titleMatch[2] : undefined;

  // Generate a consistent gradient color based on plugin name for default image
  const getGradientColor = (name: string) => {
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    return {
      from: `hsl(${hue}, 70%, 60%)`,
      to: `hsl(${(hue + 60) % 360}, 70%, 50%)`,
    };
  };

  const gradient = getGradientColor(title);
  const hasImage =
    !!plugin.image && typeof plugin.image === "string" && plugin.image.startsWith("/");

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-[#443D80]/10 hover:-translate-y-1 group border-2 hover:border-[#443D80]/30 overflow-hidden flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-40 bg-white overflow-hidden">
        {hasImage ? (
          <Image
            src={plugin.image!}
            alt={title}
            fill
            className="object-contain object-center"
            priority={false}
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center relative overflow-hidden [background:linear-gradient(135deg,var(--grad-from),var(--grad-to))]"
            style={{ "--grad-from": gradient.from, "--grad-to": gradient.to } as CSSProperties}
          >
            {/* Decorative tech pattern */}
            <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:30px_30px]" />
            {/* Icon */}
            <Package className="w-16 h-16 text-white/60 relative z-10" strokeWidth={1} />
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        {/* Header with title and link */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group/link"
              >
                <CardTitle className="text-lg group-hover/link:text-[#443D80] transition-colors line-clamp-2">
                  {title}
                </CardTitle>
                <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground group-hover/link:text-[#443D80] opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ) : (
              <CardTitle className="text-lg">{title}</CardTitle>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {plugin.tags.map((tag) => {
            // Find tag info in Tags object
            const tagKey = Object.keys(Tags).find((k) => Tags[k as TagType].label === tag) as
              | TagType
              | undefined;
            if (!tagKey) return null;
            const tagInfo = Tags[tagKey];

            return (
              <ColorBadge
                key={tag}
                color={tagInfo.color}
                variant="secondary"
                className="text-xs font-medium"
              >
                {tagInfo.label}
              </ColorBadge>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 flex-1 flex flex-col">
        {/* Type and AutoSave for Adapters - or Category for other plugins */}
        <div className="flex items-center gap-3 text-sm pb-2 border-b">
          {/* Show category for non-Adapters, Type for Adapters */}
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Category:</span>
            <span className="font-medium">
              {plugin.type ||
                plugin.tags.find((t) =>
                  ["Middleware", "Watcher", "RoleManager", "Dispatcher"].includes(t),
                ) ||
                "Other"}
            </span>
          </div>

          {/* Show AutoSave only for Adapters */}
          {plugin.autoSave && (
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="text-muted-foreground">Auto-save:</span>
              {plugin.autoSave === "✅" ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <X className="h-4 w-4 text-red-600" />
              )}
            </div>
          )}
        </div>

        {/* Description */}
        <CardDescription className="text-sm leading-relaxed flex-grow">
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  className="text-[#443D80] hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
              p: ({ node, ...props }) => <span {...props} />,
            }}
          >
            {plugin.description}
          </ReactMarkdown>
        </CardDescription>

        {/* Author */}
        {plugin.author && (
          <div className="text-xs text-muted-foreground pt-2 border-t mt-auto">
            by{" "}
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    className="text-[#443D80] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
                p: ({ node, ...props }) => <span {...props} />,
              }}
            >
              {plugin.author}
            </ReactMarkdown>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
