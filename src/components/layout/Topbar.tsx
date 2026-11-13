import type { ReactNode } from "react";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TopbarProps = {
  /** Mobile menu button (hidden from `lg` up); the AppLayout step wires it to the drawer. */
  onMenuClick: () => void;
  /** When provided, shows the desktop search bar and the mobile search icon. Omitted → no search UI. */
  onOpenSearch?: () => void;
  /** Search bar text. Defaults to the old Seiyone copy. */
  searchPlaceholder?: string;
  /** Right-side slots, rendered in the old order; each is omitted when not passed. */
  buildingSwitcher?: ReactNode;
  notifications?: ReactNode;
  userMenu?: ReactNode;
  className?: string;
};

// Display-only shortcut hint; the Ctrl/⌘K shortcut itself arrives with the search feature.
const SHORTCUT_MODIFIER =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent) ? "⌘" : "Ctrl";

export function Topbar({
  onMenuClick,
  onOpenSearch,
  searchPlaceholder = "Search clients, contracts, tasks, crew...",
  buildingSwitcher,
  notifications,
  userMenu,
  className,
}: TopbarProps) {
  return (
    <header
      className={cn(
        "relative z-30 flex h-16 shrink-0 items-center gap-4 border-b bg-card/80 px-4 backdrop-blur-md sm:px-6",
        className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Open navigation"
        onClick={onMenuClick}
        className="text-muted-foreground lg:hidden"
      >
        <Menu className="!h-5 !w-5" />
      </Button>

      {onOpenSearch && (
        <button
          type="button"
          onClick={onOpenSearch}
          aria-label="Search"
          title={`Search for anything (${SHORTCUT_MODIFIER}+K)`}
          className="hidden w-72 items-center gap-2.5 rounded-xl border bg-muted/50 px-3.5 py-2 text-left text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:bg-card hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 md:flex lg:w-96"
        >
          <Search aria-hidden="true" className="h-4 w-4 shrink-0" />
          <span className="flex-1 truncate font-medium">{searchPlaceholder}</span>
          <kbd className="inline-flex h-5 items-center gap-0.5 rounded border bg-card px-1.5 font-mono text-[10px] font-semibold">
            <span>{SHORTCUT_MODIFIER}</span>K
          </kbd>
        </button>
      )}

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {onOpenSearch && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Search"
            onClick={onOpenSearch}
            className="text-muted-foreground hover:text-foreground md:hidden"
          >
            <Search className="!h-5 !w-5" />
          </Button>
        )}
        {buildingSwitcher}
        {notifications}
        {userMenu}
      </div>
    </header>
  );
}
