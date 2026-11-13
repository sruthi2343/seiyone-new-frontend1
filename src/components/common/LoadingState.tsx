import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type LoadingStateProps = {
  /** `page`: spinner + page-shaped skeleton (lazy module loading). `inline`: spinner + label only. */
  variant?: "page" | "inline";
  label?: string;
  className?: string;
};

export function LoadingState({ variant = "page", label = "Loading...", className }: LoadingStateProps) {
  const spinner = (
    <div className="flex items-center gap-3 text-sm text-primary">
      <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin motion-reduce:animate-none" />
      {label}
    </div>
  );

  if (variant === "inline") {
    return (
      <div role="status" aria-live="polite" className={cn("flex items-center justify-center p-6", className)}>
        {spinner}
      </div>
    );
  }

  return (
    <div role="status" aria-live="polite" className={cn("space-y-6 p-6 md:p-8", className)}>
      {spinner}
      <div aria-hidden="true" className="space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-7 w-56" />
          <Skeleton className="h-4 w-2/3 max-w-lg" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <Skeleton key={item} className="h-28 rounded-2xl" />
          ))}
        </div>
        <div className="space-y-5 rounded-2xl border bg-card p-6">
          {[0, 1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-8" />
          ))}
        </div>
      </div>
    </div>
  );
}
