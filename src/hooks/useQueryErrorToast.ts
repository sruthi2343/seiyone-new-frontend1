import { useEffect } from "react";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/apiError";

/** Shows one error toast when a query fails. Usage: `useQueryErrorToast(query.error, "Could not load customers.")`. */
export function useQueryErrorToast(error: unknown, fallback?: string) {
  useEffect(() => {
    if (error) toast.error(getApiErrorMessage(error, fallback));
  }, [error, fallback]);
}
