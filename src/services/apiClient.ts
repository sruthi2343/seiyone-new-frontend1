import axios, { type AxiosRequestConfig } from "axios";

/**
 * Backend base URL from `VITE_API_URL` (see .env.example). When unset, requests are relative to the
 * current origin. Endpoint paths live in each feature's `api/` folder — never here.
 */
export const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "").trim().replace(/\/+$/, "");

export const apiClient = axios.create({
  baseURL: API_BASE_URL || undefined,
  timeout: 30_000,
  headers: { Accept: "application/json" },
});

// Auth headers / cookies, CSRF and refresh handling are added as interceptors in the auth phase,
// once the backend's authentication contract is known.

/** GET → response body. */
export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await apiClient.get<T>(url, config);
  return data;
}

/** POST → response body. Objects are sent as JSON; FormData is sent as multipart. */
export async function apiPost<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await apiClient.post<T>(url, body, config);
  return data;
}

/** PUT → response body. */
export async function apiPut<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await apiClient.put<T>(url, body, config);
  return data;
}

/** PATCH → response body. */
export async function apiPatch<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await apiClient.patch<T>(url, body, config);
  return data;
}

/** DELETE → response body. */
export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await apiClient.delete<T>(url, config);
  return data;
}
