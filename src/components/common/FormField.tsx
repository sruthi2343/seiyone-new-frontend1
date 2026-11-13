import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/** Spread onto the control so the label, error and control stay linked for screen readers. */
export type FormFieldControlProps = {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby": string | undefined;
  "aria-required": boolean | undefined;
};

type FormFieldProps = {
  id: string;
  label: ReactNode;
  error?: string;
  required?: boolean;
  /** Render the control with the accessibility props, e.g. `{(field) => <Input {...field} />}`. */
  children: (field: FormFieldControlProps) => ReactNode;
  className?: string;
};

export function FormField({ id, label, error, required, children, className }: FormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id}>
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-destructive">
            *
          </span>
        )}
      </Label>
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
        "aria-required": required || undefined,
      })}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
