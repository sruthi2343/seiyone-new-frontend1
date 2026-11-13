import { Suspense, useState, type ReactNode } from "react";
import { Outlet, useLocation } from "react-router";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { LoadingState } from "@/components/common/LoadingState";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { UserMenu } from "@/components/layout/UserMenu";
import type { NavAudience } from "@/routes/navigation";

type AppLayoutProps = {
  /** "client" switches sidebar labels (e.g. "Tasks & Deliverables"). Default "staff". */
  audience?: NavAudience;
  /** Topbar right-side slots; filled by the buildings / notifications phases. */
  buildingSwitcher?: ReactNode;
  notifications?: ReactNode;
  /** Defaults to <UserMenu /> (neutral "Account" state) until auth provides a user. */
  userMenu?: ReactNode;
};

/** Authenticated app shell: sidebar (drawer below `lg`), top bar and the routed page. */
export function AppLayout({ audience = "staff", buildingSwitcher, notifications, userMenu }: AppLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="flex h-[100dvh] min-h-0 w-full overflow-hidden bg-background">
      <Sidebar audience={audience} className="hidden shrink-0 lg:flex" />

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="left" aria-describedby={undefined} className="w-72 p-0 sm:max-w-none lg:hidden">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Sidebar audience={audience} onNavigate={() => setDrawerOpen(false)} className="w-full border-r-0" />
        </SheetContent>
      </Sheet>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar
          onMenuClick={() => setDrawerOpen(true)}
          buildingSwitcher={buildingSwitcher}
          notifications={notifications}
          userMenu={userMenu ?? <UserMenu />}
        />
        <main className="min-h-0 min-w-0 flex-1 overflow-auto overscroll-contain">
          <ErrorBoundary resetKey={pathname}>
            <Suspense fallback={<LoadingState />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
