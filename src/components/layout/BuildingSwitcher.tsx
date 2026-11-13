import { Building2, Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type BuildingOption = { id: string; name: string };

type BuildingSwitcherProps = {
  buildings: readonly BuildingOption[];
  /** Id of the selected building; the data layer (later phase) decides the default. */
  activeId: string | null;
  onChange: (id: string) => void;
  className?: string;
};

/** Selects the building the app works with. Presentational: data and persistence live elsewhere. */
export function BuildingSwitcher({ buildings, activeId, onChange, className }: BuildingSwitcherProps) {
  if (buildings.length === 0) return null;

  const active = buildings.find((building) => building.id === activeId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Switch building"
          title="Switch building"
          className={cn(
            "flex max-w-[11rem] items-center gap-2 rounded-full border px-3 py-2 text-left text-xs font-semibold text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 sm:max-w-[14rem]",
            className
          )}
        >
          <Building2 aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate">{active?.name ?? "Select building"}</span>
          <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 rounded-xl p-1.5">
        <DropdownMenuLabel className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Building
        </DropdownMenuLabel>
        {buildings.map((building) => {
          const selected = building.id === active?.id;
          return (
            <DropdownMenuItem
              key={building.id}
              onSelect={() => {
                if (!selected) onChange(building.id);
              }}
              className={cn(
                "cursor-pointer rounded-lg text-xs",
                selected && "bg-primary/10 font-semibold text-primary focus:bg-primary/10 focus:text-primary"
              )}
            >
              <Check aria-hidden="true" className={cn("mr-2 h-3.5 w-3.5 text-primary", !selected && "invisible")} />
              <span className="truncate">{building.name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
