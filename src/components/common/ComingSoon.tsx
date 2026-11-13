import { ArrowRight, Wrench } from "lucide-react";
import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ROUTE_PATHS } from "@/routes/paths";

type ComingSoonProps = {
  /** `app`: inside the shell, with a link to Settings. `public`: no admin links for anonymous visitors. */
  variant?: "app" | "public";
};

export function ComingSoon({ variant = "app" }: ComingSoonProps) {
  const isApp = variant === "app";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-6 text-center",
        isApp ? "h-full min-h-[80vh]" : "min-h-[100dvh]"
      )}
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
        <Wrench aria-hidden="true" className="h-10 w-10" />
      </div>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight text-foreground">Module in Development</h1>
      <p className="max-w-sm text-muted-foreground">
        This area of Seiyone is currently being crafted for your workspace.
        {isApp && " Configuration options for this module can be set up in Settings."}
      </p>
      {isApp && (
        <Link to={ROUTE_PATHS.settings} className={cn(buttonVariants({ variant: "outline" }), "mt-8")}>
          Go to Settings
          <ArrowRight aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
