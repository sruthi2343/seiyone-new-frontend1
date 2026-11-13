import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageContainer({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("w-full min-w-0 space-y-6 p-4 sm:p-6 md:p-8", className)}>{children}</div>;
}

type PageHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  icon?: LucideIcon;
  /** Page-level actions (e.g. "New booking"), aligned right on wide screens. */
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({ title, description, icon: Icon, actions, className }: PageHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", className)}>
      <div className="min-w-0">
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-foreground">
          {Icon && <Icon aria-hidden="true" className="h-6 w-6 shrink-0 text-primary" />}
          {title}
        </h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 sm:justify-end">{actions}</div>}
    </header>
  );
}
