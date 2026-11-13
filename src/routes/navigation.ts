import {
  Box,
  Briefcase,
  Building2,
  Calendar,
  ChartPie,
  CreditCard,
  FileText,
  FolderOpen,
  House,
  Key,
  LifeBuoy,
  PaintBucket,
  Settings,
  ShoppingCart,
  SquareCheckBig,
  UserCheck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { ROUTE_PATHS, type RoutePath } from "@/routes/paths";

/** Who is viewing the sidebar; only changes labels (visibility filtering arrives with permissions). */
export type NavAudience = "staff" | "client";

export type NavItem = {
  label: string;
  /** Shown to client-portal accounts instead of `label`. */
  clientLabel?: string;
  path: RoutePath;
  icon: LucideIcon;
};

export type NavGroupLabel = "Overview" | "Operations" | "Finance" | "System";

export type NavGroup = {
  label: NavGroupLabel;
  items: readonly NavItem[];
};

/** Sidebar groups and items exactly as in the old Seiyone app (labels, order, icons, paths). */
export const NAV_GROUPS: readonly NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", path: ROUTE_PATHS.dashboard, icon: House },
      { label: "CRM", path: ROUTE_PATHS.crm, icon: Users },
      { label: "Client Management", path: ROUTE_PATHS.clientManagement, icon: Briefcase },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "Bookings", path: ROUTE_PATHS.bookings, icon: Calendar },
      { label: "Access Control", path: ROUTE_PATHS.accessControl, icon: Key },
      { label: "Asset", path: ROUTE_PATHS.assetInventory, icon: Box },
      { label: "Housekeeping", path: ROUTE_PATHS.housekeeping, icon: PaintBucket },
      { label: "Maintenance", path: ROUTE_PATHS.maintenance, icon: Wrench },
      { label: "Vendor Management", path: ROUTE_PATHS.vendorManagement, icon: Wrench },
      { label: "Purchase", path: ROUTE_PATHS.purchase, icon: ShoppingCart },
      { label: "Crew", path: ROUTE_PATHS.crew, icon: Users },
      { label: "Visitor Management", path: ROUTE_PATHS.visitorManagement, icon: UserCheck },
      { label: "Help Desk", path: ROUTE_PATHS.helpDesk, icon: LifeBuoy },
      { label: "Contract Management", path: ROUTE_PATHS.contractManagement, icon: FileText },
      {
        label: "Task Management",
        clientLabel: "Tasks & Deliverables",
        path: ROUTE_PATHS.taskManagement,
        icon: SquareCheckBig,
      },
      { label: "File Manager", path: ROUTE_PATHS.fileManager, icon: FolderOpen },
      { label: "Documents & Notices", path: ROUTE_PATHS.clientDocuments, icon: FileText },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Billing & Sales", path: ROUTE_PATHS.billingSales, icon: CreditCard },
      { label: "Accounts", path: ROUTE_PATHS.accounts, icon: Building2 },
      { label: "Reports", path: ROUTE_PATHS.reports, icon: ChartPie },
    ],
  },
  {
    label: "System",
    items: [{ label: "Settings", path: ROUTE_PATHS.settings, icon: Settings }],
  },
];

export function getNavItemLabel(item: NavItem, audience: NavAudience = "staff"): string {
  return audience === "client" && item.clientLabel ? item.clientLabel : item.label;
}

/** Exact match, as in the old Seiyone sidebar: an item is active only on its own URL, not on sub-pages. */
export function isNavItemActive(item: NavItem, pathname: string): boolean {
  return pathname === item.path;
}
