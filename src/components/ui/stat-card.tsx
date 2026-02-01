import * as React from "react";
import { Card } from "./card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps extends React.ComponentProps<typeof Card> {
  icon: LucideIcon;
  iconColor?: string;
  value: string | number;
  label: string;
}

/**
 * StatCard component: Card for displaying statistical data
 * Uses CSS variables to set colors, following Tailwind CSS best practices
 * @param icon - Lucide icon component
 * @param iconColor - Hexadecimal color value (e.g., '#EF4444')
 * @param value - Statistical value
 * @param label - Label text
 * @param className - Additional Tailwind classes
 */
function StatCard({
  icon: Icon,
  iconColor,
  value,
  label,
  className,
  style,
  ...props
}: StatCardProps) {
  const customStyle: React.CSSProperties = {
    ...(iconColor
      ? ({ "--stat-color": iconColor } as React.CSSProperties & { "--stat-color": string })
      : {}),
    ...style,
  };

  return (
    <Card
      className={cn("p-6 text-center hover:shadow-md transition-shadow", className)}
      style={customStyle}
      {...props}
    >
      <div className="flex justify-center mb-2">
        <div
          className={cn(
            "p-3 rounded-lg",
            iconColor && "bg-[color-mix(in_srgb,var(--stat-color)_8%,transparent)]",
          )}
        >
          <Icon className={cn("h-6 w-6", iconColor && "text-[var(--stat-color)]")} />
        </div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </Card>
  );
}

export { StatCard };
