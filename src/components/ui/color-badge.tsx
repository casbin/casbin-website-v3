import * as React from "react"
import { Badge, badgeVariants } from "./badge"
import { cn } from "@/lib/utils"
import type { VariantProps } from "class-variance-authority"

interface ColorBadgeProps
  extends Omit<React.ComponentProps<typeof Badge>, "variant">,
    VariantProps<typeof badgeVariants> {
  color?: string
  isSelected?: boolean
}

/**
 * ColorBadge 组件: 支持动态颜色的 Badge 组件
 * 使用 CSS 变量来设置颜色，遵循 Tailwind CSS 最佳实践
 * @param color - 十六进制颜色值 (e.g., '#00ADD8')
 * @param isSelected - 是否处于选中状态
 * @param variant - Badge 变体
 * @param className - 额外的 Tailwind 类
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
    ...(color ? { "--badge-color": color } as React.CSSProperties & { "--badge-color": string } : {}),
    ...style,
  }

  const badgeClassName = cn(
    color && isSelected && "[--badge-color:var(--badge-color)] bg-[var(--badge-color)] border-[var(--badge-color)]",
    color && !isSelected && "[--badge-color:var(--badge-color)] border-[color-mix(in_srgb,var(--badge-color)_32%,transparent)]",
    className
  )

  return (
    <Badge
      variant={variant}
      className={badgeClassName}
      style={customStyle}
      {...props}
    />
  )
}

export { ColorBadge }
