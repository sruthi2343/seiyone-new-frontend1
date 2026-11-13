import type { ReactNode } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ConfirmTone = "danger" | "warning";

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called on confirm. The dialog stays open; the caller closes it when the action finishes. */
  onConfirm: () => void;
  description: ReactNode;
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: ConfirmTone;
  /** While true the buttons are disabled and the dialog cannot be dismissed. */
  loading?: boolean;
};

export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  description,
  title = "Are you sure?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "danger",
  loading = false,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={(next) => !loading && onOpenChange(next)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle
              aria-hidden="true"
              className={cn("h-5 w-5 shrink-0", tone === "danger" ? "text-destructive" : "text-amber-600")}
            />
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>{cancelLabel}</AlertDialogCancel>
          <Button
            variant={tone === "danger" ? "destructive" : "default"}
            className={cn(tone === "warning" && "bg-amber-600 text-white hover:bg-amber-600/90")}
            disabled={loading}
            onClick={onConfirm}
          >
            {loading && <Loader2 aria-hidden="true" className="animate-spin motion-reduce:animate-none" />}
            {confirmLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
