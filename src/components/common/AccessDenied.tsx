import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

type AccessDeniedProps =
  | {
      /** Whole module/page is not permitted. */
      variant: "module";
      /** Shown as "Your role (<label>) …" when known. */
      roleLabel?: string;
      title?: string;
      description?: string;
      className?: string;
    }
  | {
      /** The module opens, but none of its tabs are permitted. */
      variant: "tab";
      /** Module name used in the message, e.g. "Housekeeping". */
      module: string;
      title?: string;
      description?: string;
      className?: string;
    };

/** Presentational only — callers decide when access is denied. */
export function AccessDenied(props: AccessDeniedProps) {
  if (props.variant === "tab") {
    return (
      <div
        role="alert"
        className={cn(
          "m-6 flex flex-col items-center justify-center rounded-2xl border bg-card p-10 text-center",
          props.className
        )}
      >
        <Lock aria-hidden="true" className="mb-3 h-6 w-6 text-muted-foreground" />
        <h2 className="text-base font-semibold text-foreground">{props.title ?? `No ${props.module} views`}</h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {props.description ??
            `Your role has no ${props.module} tab permissions. Ask your administrator to grant the tabs you need in Roles & Permissions.`}
        </p>
      </div>
    );
  }

  const role = props.roleLabel ? `Your role (${props.roleLabel})` : "Your role";
  return (
    <div
      role="alert"
      className={cn("flex h-[75vh] flex-col items-center justify-center p-6 text-center", props.className)}
    >
      <div className="mb-4 rounded-full bg-destructive/10 p-4 text-destructive">
        <Lock aria-hidden="true" className="h-10 w-10" />
      </div>
      <h2 className="text-xl font-bold text-foreground">{props.title ?? "Access Denied"}</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {props.description ??
          `${role} does not have permission to access this module. Please contact your system administrator if you require access.`}
      </p>
    </div>
  );
}
