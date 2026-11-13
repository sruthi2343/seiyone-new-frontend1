import type { AppSlice } from "@/store/appStore";

export interface SessionSlice {
  /**
   * The building the app works with (the old app's BuildingContext selection), remembered across reloads.
   * Only the id lives here; the building list is server state. Connected in the buildings phase.
   */
  activeBuildingId: string | null;
  setActiveBuildingId: (id: string | null) => void;
}

export const createSessionSlice: AppSlice<SessionSlice> = (set) => ({
  activeBuildingId: null,
  setActiveBuildingId: (activeBuildingId) => set({ activeBuildingId }, false, "session/setActiveBuildingId"),
});
