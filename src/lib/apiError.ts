import { isAxiosError } from "axios";

const DEFAULT_MESSAGE = "Something went wrong. Please try again.";

/**
 * User-facing message for a failed request. The backend error format is not known yet, so this
 * only distinguishes "no response" from other failures; read the server's message here once the
 * contract is defined.
 */
export function getApiErrorMessage(error: unknown, fallback: string = DEFAULT_MESSAGE): string {
  if (isAxiosError(error) && !error.response) {
    return error.code === "ECONNABORTED"
      ? "The server took too long to respond. Please try again."
      : "Unable to reach the server. Check your connection and try again.";
  }
  return fallback;
}

/** True for 4xx responses — retrying them cannot succeed. */
export function isClientError(error: unknown): boolean {
  const status = isAxiosError(error) ? error.response?.status : undefined;
  return status !== undefined && status >= 400 && status < 500;
}
