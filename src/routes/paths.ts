/**
 * Every frontend URL in one place. Paths match the old Seiyone app exactly.
 * Frontend routes only — backend API endpoints never live here.
 */
export const ROUTE_PATHS = {
  home: "/",
  login: "/login",

  // Overview
  dashboard: "/dashboard",
  crm: "/crm",
  clientManagement: "/client-management",

  // Operations
  bookings: "/bookings",
  accessControl: "/access-control",
  assetInventory: "/asset-inventory",
  housekeeping: "/housekeeping",
  maintenance: "/maintenance",
  vendorManagement: "/vendor-management",
  purchase: "/purchase",
  crew: "/crew",
  visitorManagement: "/visitor-management",
  helpDesk: "/help-desk",
  contractManagement: "/contract-management",
  taskManagement: "/task-management",
  fileManager: "/file-manager",
  clientDocuments: "/client-documents",

  // Finance
  billingSales: "/billing-sales",
  accounts: "/accounts",
  reports: "/reports",

  // System
  settings: "/settings",
  profile: "/profile",
  notifications: "/notifications",

  // Public (no sign-in, no app shell) — path patterns; routes are registered in a later phase
  helpDeskPublicReport: "/help-desk/report",
  helpDeskClientTicket: "/help-desk/ticket/:id/client",
  clientPortalAsset: "/client-portal/assets/:id",
  assetScan: "/asset-inventory/scan/:tag",
  visitorKiosk: "/visitor-management/kiosk",
  visitorInvite: "/visitor-invite/:qrToken",
  visitorBadge: "/visitor-badge/:id",
} as const;

export type RouteKey = keyof typeof ROUTE_PATHS;
export type RoutePath = (typeof ROUTE_PATHS)[RouteKey];
