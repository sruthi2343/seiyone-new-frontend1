import { createBrowserRouter, Navigate } from "react-router";
import { ComingSoon } from "@/components/common/ComingSoon";
import { NotFound } from "@/components/common/NotFound";
import { AppLayout } from "@/components/layout/AppLayout";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ROUTE_PATHS } from "@/routes/paths";
import { APP_ROUTES, GUEST_ROUTES, PUBLIC_ROUTES } from "@/routes/routeConfig";

export const router = createBrowserRouter([
  // Public and guest (sign-in) pages — no sidebar/topbar.
  {
    element: <PublicLayout />,
    children: [
      ...GUEST_ROUTES.map(({ path, Component }) => ({ path, element: <Component /> })),
      ...PUBLIC_ROUTES.map(({ path, Component }) => ({
        path,
        element: Component ? <Component /> : <ComingSoon variant="public" />,
      })),
    ],
  },

  // App shell.
  // TEMP (local development only): this branch is UNGUARDED. The auth phase wraps it in
  // <ProtectedRoute> and replaces the "/" redirect with the per-user home path.
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to={ROUTE_PATHS.dashboard} replace /> },
      ...APP_ROUTES.map(({ path, Component }) => ({
        path,
        element: Component ? <Component /> : <ComingSoon />,
      })),
      { path: "*", element: <NotFound /> },
    ],
  },
]);
