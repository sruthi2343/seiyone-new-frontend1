import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { ROUTE_PATHS } from "@/routes/paths";
import {
  NAV_GROUPS,
  getNavItemLabel,
  isNavItemActive,
  type NavAudience,
  type NavGroup,
} from "@/routes/navigation";
import seiyoneLogo from "@/assets/images/seiyone-logo.png";

type SidebarProps = {
  /** Defaults to NAV_GROUPS; callers may pass a filtered list later (permissions phase). */
  groups?: readonly NavGroup[];
  /** "client" shows client labels, e.g. "Tasks & Deliverables". Default "staff". */
  audience?: NavAudience;
  /** Logo link target. Default ROUTE_PATHS.home. */
  homePath?: string;
  /** Called after a link is clicked — the future mobile drawer uses it to close itself. */
  onNavigate?: () => void;
  className?: string;
};

export function Sidebar({
  groups = NAV_GROUPS,
  audience = "staff",
  homePath = ROUTE_PATHS.home,
  onNavigate,
  className,
}: SidebarProps) {
  const { pathname } = useLocation();

  return (
    <aside className={cn("flex h-full min-h-0 w-72 flex-col border-r bg-card", className)}>
      <div className="flex h-16 shrink-0 items-center border-b px-6">
        <Link to={homePath} onClick={onNavigate} className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 p-1.5">
            <img src={seiyoneLogo} alt="Seiyone logo" className="h-full w-full object-contain" />
          </span>
          <span className="text-xl font-bold tracking-tight text-primary">Seiyone</span>
        </Link>
      </div>

      <nav aria-label="Main navigation" className="min-h-0 flex-1 space-y-6 overflow-y-auto px-4 py-4">
        {groups.map((group) => {
          if (group.items.length === 0) return null;
          return (
            <div key={group.label}>
              <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </h4>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = isNavItemActive(item, pathname);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      <Icon aria-hidden="true" className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-muted-foreground")} />
                      {getNavItemLabel(item, audience)}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
