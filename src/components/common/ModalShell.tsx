import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const SIZE_CLASSES = {
  sm: "sm:max-w-md",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
  xl: "sm:max-w-4xl",
} as const;

type ModalShellProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  size?: keyof typeof SIZE_CLASSES;
  /** False while saving: outside clicks and Escape no longer close the modal. */
  dismissible?: boolean;
  /** Compose with `ModalBody` (scrolls) and `ModalFooter` (stays visible); a `<form>` may wrap both. */
  children: ReactNode;
  className?: string;
};

/** Full-screen on phones, centred dialog from `sm` up. */
export function ModalShell({
  open,
  onOpenChange,
  title,
  description,
  size = "md",
  dismissible = true,
  children,
  className,
}: ModalShellProps) {
  const blockDismiss = (event: Event) => {
    if (!dismissible) event.preventDefault();
  };

  return (
    <Dialog open={open} onOpenChange={(next) => (dismissible || next) && onOpenChange(next)}>
      <DialogContent
        {...(description ? {} : { "aria-describedby": undefined })}
        onInteractOutside={blockDismiss}
        onEscapeKeyDown={blockDismiss}
        className={cn(
          "inset-0 left-0 top-0 flex h-[100dvh] max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none p-0",
          "sm:inset-auto sm:left-[50%] sm:top-[50%] sm:h-auto sm:max-h-[90dvh] sm:w-[calc(100%-2rem)] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-lg",
          SIZE_CLASSES[size],
          className
        )}
      >
        <DialogHeader className="shrink-0 px-5 pb-4 pr-12 pt-5 text-left sm:px-6 sm:pt-6">
          <DialogTitle className="text-xl">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export function ModalBody({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5 sm:px-6", className)}>
      {children}
    </div>
  );
}

export function ModalFooter({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col-reverse gap-2 border-t bg-background px-5 py-4 sm:flex-row sm:justify-end sm:px-6",
        className
      )}
    >
      {children}
    </div>
  );
}
