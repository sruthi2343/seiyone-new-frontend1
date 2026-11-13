import { create, type StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { createSessionSlice, type SessionSlice } from "@/store/slices/sessionSlice";

/**
 * Global CLIENT state only (selections, UI preferences shared across the app).
 * Server data (lists, records, the building list…) belongs in TanStack Query — never copy it here.
 */
export type AppState = SessionSlice;

type Middlewares = [["zustand/devtools", never], ["zustand/persist", unknown]];

/** Type for slice creators: `export const createXSlice: AppSlice<XSlice> = (set, get) => ({ … })`. */
export type AppSlice<T> = StateCreator<AppState, Middlewares, [], T>;

export const useAppStore = create<AppState>()(
  devtools(
    persist((...args) => ({ ...createSessionSlice(...args) }), {
      name: "seiyone-app",
      version: 1,
      // If storage is blocked (private mode), zustand skips persistence and state stays in memory.
      storage: createJSONStorage(() => localStorage),
      // Persist only what must survive a reload.
      partialize: (state) => ({ activeBuildingId: state.activeBuildingId }),
    }),
    { name: "seiyone-app", enabled: import.meta.env.DEV }
  )
);
