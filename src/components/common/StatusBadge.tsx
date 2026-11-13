import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";

const TONE_CLASSES: Record<StatusTone, string> = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-red-200 bg-red-50 text-red-700",
  info: "border-sky-200 bg-sky-50 text-sky-700",
  neutral: "border-border bg-muted text-muted-foreground",
};

type StatusBadgeProps = {
  /** Each module maps its own statuses to a tone; the badge only renders it. */
  tone: StatusTone;
  children: ReactNode;
  className?: string;
};

export function StatusBadge({ tone, children, className }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn("whitespace-nowrap rounded-full font-medium", TONE_CLASSES[tone], className)}>
      {children}
    </Badge>
  );
}
