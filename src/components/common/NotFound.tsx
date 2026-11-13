import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/routes/paths";

/** Unknown URL inside the app shell. */
export function NotFound() {
  return (
    <div className="flex h-full min-h-[80vh] flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <span className="text-3xl font-bold tracking-tighter">404</span>
      </div>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight text-foreground">Page Not Found</h1>
      <p className="mb-8 max-w-sm text-muted-foreground">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to={ROUTE_PATHS.home} className={buttonVariants({ variant: "outline" })}>
        <ArrowLeft aria-hidden="true" />
        Back to Dashboard
      </Link>
    </div>
  );
}
