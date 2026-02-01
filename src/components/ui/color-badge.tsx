import * as React from "react";
import { Badge, badgeVariants } from "./badge";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface ColorBadgeProps
  extends Omit<React.ComponentProps<typeof Badge>, "variant">, VariantProps<typeof badgeVariants> {
  color?: string;
  isSelected?: boolean;
}

/**
 * ColorBadge component: Badge component with dynamic color support
 * Uses CSS variables to set colors, following Tailwind CSS best practices
 * @param color - Hexadecimal color value (e.g., '#00ADD8')
 * @param isSelected - Whether it is in selected state
 * @param variant - Badge variant
 * @param className - Additional Tailwind classes
 */
function ColorBadge({
  color,
  isSelected = false,
  variant = isSelected ? "default" : "outline",
  className,
  style,
  ...props
}: ColorBadgeProps) {
  const customStyle: React.CSSProperties = {
    ...(color
      ? ({ "--badge-color": color } as React.CSSProperties & { "--badge-color": string })
      : {}),
    ...style,
  };

  const badgeClassName = cn(
    color &&
      isSelected &&
      "[--badge-color:var(--badge-color)] bg-[var(--badge-color)] border-[var(--badge-color)]",
    color &&
      !isSelected &&
      "[--badge-color:var(--badge-color)] border-[color-mix(in_srgb,var(--badge-color)_32%,transparent)]",
    className,
  );

  return <Badge variant={variant} className={badgeClassName} style={customStyle} {...props} />;
}

export { ColorBadge };
