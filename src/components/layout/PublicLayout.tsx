import { Suspense } from "react";
import { Outlet, useLocation } from "react-router";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { LoadingState } from "@/components/common/LoadingState";

/** Public pages (kiosk, invites, badges, public reports, asset scans): no sidebar or top bar, no sign-in. */
export function PublicLayout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-[100dvh] bg-background">
      <ErrorBoundary resetKey={pathname}>
        <Suspense fallback={<LoadingState />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
