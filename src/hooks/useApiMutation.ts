import { useMutation, useQueryClient, type QueryKey, type UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/apiError";

type ApiMutationOptions<TData, TVariables> = Omit<UseMutationOptions<TData, Error, TVariables>, "mutationFn"> & {
  /** Query keys to invalidate after success, e.g. `[customerKeys.all]`. */
  invalidate?: readonly QueryKey[];
  /** Toast shown after success. */
  successMessage?: string;
  /** Fallback toast text on failure (see getApiErrorMessage). */
  errorMessage?: string;
};

/**
 * useMutation with the app's defaults: invalidates the given queries, shows a success toast and an
 * error toast. Usage: `useApiMutation(createCustomer, { invalidate: [customerKeys.all], successMessage: "Saved" })`.
 */
export function useApiMutation<TData, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  { invalidate = [], successMessage, errorMessage, onSuccess, onError, ...options }: ApiMutationOptions<TData, TVariables> = {}
) {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    ...options,
    mutationFn,
    onSuccess: async (...args) => {
      await Promise.all(invalidate.map((queryKey) => queryClient.invalidateQueries({ queryKey })));
      if (successMessage) toast.success(successMessage);
      await onSuccess?.(...args);
    },
    onError: async (...args) => {
      toast.error(getApiErrorMessage(args[0], errorMessage));
      await onError?.(...args);
    },
  });
}
