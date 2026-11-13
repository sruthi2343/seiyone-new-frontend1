import { ChevronDown, LogOut, User, UserRound } from "lucide-react";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ROUTE_PATHS } from "@/routes/paths";

export type UserMenuUser = {
  displayName: string;
  username?: string;
  email?: string;
  roleLabel?: string;
};

type UserMenuProps = {
  /** Signed-in user; omitted → neutral "Account" menu. */
  user?: UserMenuUser;
  /** Target of "My Profile". Default ROUTE_PATHS.profile. */
  profilePath?: string;
  /** When provided, "Sign Out" is shown and calls it. Navigation after sign-out is the caller's job. */
  onSignOut?: () => void;
  className?: string;
};

export function UserMenu({ user, profilePath = ROUTE_PATHS.profile, onSignOut, className }: UserMenuProps) {
  const initial = (user?.displayName.trim() || user?.username?.trim() || "").charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Account menu"
          className={cn(
            "flex items-center gap-3 rounded-full border p-1.5 pl-2.5 text-left transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20",
            className
          )}
        >
          <span className="flex items-center gap-2">
            {user && initial ? (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {initial}
              </span>
            ) : (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <UserRound aria-hidden="true" className="h-4 w-4" />
              </span>
            )}
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-xs font-semibold leading-tight text-foreground">
                {user ? user.displayName : "Account"}
              </span>
              {user?.roleLabel && (
                <span className="block truncate text-[10px] font-medium text-primary">{user.roleLabel}</span>
              )}
            </span>
          </span>
          <ChevronDown aria-hidden="true" className="mr-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5">
        {user ? (
          <div className="px-3 py-2">
            <p className="truncate text-xs font-semibold text-foreground">{user.displayName}</p>
            {user.username && (
              <p className="truncate font-mono text-[11px] text-muted-foreground">@{user.username}</p>
            )}
            {user.email && <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{user.email}</p>}
          </div>
        ) : (
          <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold">Account</DropdownMenuLabel>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="cursor-pointer rounded-lg text-xs font-medium">
          <Link to={profilePath}>
            <User aria-hidden="true" className="text-primary" />
            My Profile
          </Link>
        </DropdownMenuItem>

        {onSignOut && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={onSignOut}
              className="cursor-pointer rounded-lg text-xs font-medium text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <LogOut aria-hidden="true" />
              Sign Out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
