import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import { ROUTE_PATHS, type RoutePath } from "@/routes/paths";

type PageComponent = ComponentType | LazyExoticComponent<ComponentType>;

export type PageRoute = {
  path: RoutePath;
  /** The page. Omitted → the router shows the ComingSoon placeholder. Modules add lazy pages here. */
  Component?: PageComponent;
};

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const DashboardPage = lazy(() => import("@/features/dashboard/pages/DashboardPage"));

/** Guest routes (sign-in): rendered in PublicLayout. The auth phase redirects signed-in users away. */
export const GUEST_ROUTES: readonly Required<PageRoute>[] = [{ path: ROUTE_PATHS.login, Component: LoginPage }];

/** Routes inside the app shell: the 21 sidebar modules plus profile and notifications. */
export const APP_ROUTES: readonly PageRoute[] = [
  // Overview
  { path: ROUTE_PATHS.dashboard, Component: DashboardPage },
  { path: ROUTE_PATHS.crm },
  { path: ROUTE_PATHS.clientManagement },

  // Operations
  { path: ROUTE_PATHS.bookings },
  { path: ROUTE_PATHS.accessControl },
  { path: ROUTE_PATHS.assetInventory },
  { path: ROUTE_PATHS.housekeeping },
  { path: ROUTE_PATHS.maintenance },
  { path: ROUTE_PATHS.vendorManagement },
  { path: ROUTE_PATHS.purchase },
  { path: ROUTE_PATHS.crew },
  { path: ROUTE_PATHS.visitorManagement },
  { path: ROUTE_PATHS.helpDesk },
  { path: ROUTE_PATHS.contractManagement },
  { path: ROUTE_PATHS.taskManagement },
  { path: ROUTE_PATHS.fileManager },
  { path: ROUTE_PATHS.clientDocuments },

  // Finance
  { path: ROUTE_PATHS.billingSales },
  { path: ROUTE_PATHS.accounts },
  { path: ROUTE_PATHS.reports },

  // System
  { path: ROUTE_PATHS.settings },
  { path: ROUTE_PATHS.profile },
  { path: ROUTE_PATHS.notifications },
];

/** Public routes: rendered in PublicLayout, no sidebar/top bar, no sign-in. */
export const PUBLIC_ROUTES: readonly PageRoute[] = [
  { path: ROUTE_PATHS.helpDeskPublicReport },
  { path: ROUTE_PATHS.helpDeskClientTicket },
  { path: ROUTE_PATHS.clientPortalAsset },
  { path: ROUTE_PATHS.assetScan },
  { path: ROUTE_PATHS.visitorKiosk },
  { path: ROUTE_PATHS.visitorInvite },
  { path: ROUTE_PATHS.visitorBadge },
];
