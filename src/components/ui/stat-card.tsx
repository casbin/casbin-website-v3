import * as React from "react"
import { Card } from "./card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCardProps extends React.ComponentProps<typeof Card> {
  icon: LucideIcon
  iconColor?: string
  value: string | number
  label: string
}

/**
 * StatCard 组件: 用于展示统计数据的卡片
 * 使用 CSS 变量来设置颜色，遵循 Tailwind CSS 最佳实践
 * @param icon - Lucide 图标组件
 * @param iconColor - 十六进制颜色值 (e.g., '#EF4444')
 * @param value - 统计数值
 * @param label - 标签文本
 * @param className - 额外的 Tailwind 类
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
    ...(iconColor ? { "--stat-color": iconColor } as React.CSSProperties & { "--stat-color": string } : {}),
    ...style,
  }

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
            iconColor && "bg-[color-mix(in_srgb,var(--stat-color)_8%,transparent)]"
          )}
        >
          <Icon 
            className={cn(
              "h-6 w-6",
              iconColor && "text-[var(--stat-color)]"
            )}
          />
        </div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </Card>
  )
}

export { StatCard }
