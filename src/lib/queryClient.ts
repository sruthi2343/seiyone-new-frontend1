import { QueryClient } from "@tanstack/react-query";
import { isClientError } from "@/lib/apiError";

/** One QueryClient for the app. Server state lives here, never in Zustand. */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data counts as fresh for 30 s, so moving between pages doesn't refetch everything.
      staleTime: 30_000,
      // ERP screens are kept open for long periods; refetch on reconnect, not on every tab switch.
      refetchOnWindowFocus: false,
      // Retry once on network/server errors; a 4xx won't succeed on retry.
      retry: (failureCount, error) => !isClientError(error) && failureCount < 1,
    },
    mutations: {
      // Never repeat a create/update/delete automatically.
      retry: false,
    },
  },
});
