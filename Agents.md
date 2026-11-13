# Seiyone Frontend — Agent Guide

Instructions for every AI coding agent working in this repo. Read before making changes.
**Strict rules** (bottom) override everything else.

## Project

Web app for **Seiyone**, a coworking / facility-management ERP. This is a **rebuild, not a port**:
- Architecture reference: `../Chakra-Frontend` (patterns only — never copy files blindly).
- Business requirements reference: `../seiyone-frontend-source-code` (read-only; never modify).
- Backend: a **new** backend. **API contracts are not available yet** — do not invent endpoints,
  auth flows, response shapes or mock API data. Features without a contract stay UI-only.

Known domain requirements (from the old app): data is scoped to an **active building**; there are
**staff** and **client-portal** accounts with different homes / navigation; some pages are **public**
(visitor kiosk / invite / badge, help-desk public report, asset QR scan, print views).

## Stack

pnpm, React 19, TypeScript (strict), Vite, React Router 7, Tailwind CSS v3 + shadcn/ui (new-york,
CSS variables, Seiyone tokens), Inter (`@fontsource-variable/inter`), lucide-react, sonner,
TanStack Query (server state), Zustand (client state), axios, ESLint.
Planned, installed only in the phase that first uses them: Zod + react-hook-form, Vitest + Testing Library.

## Folder structure (target)

A folder is created only together with its first real file — no empty placeholder folders.

```
src/
├── main.tsx
├── app/                  App, providers, router tree
├── assets/               bundled images
├── components/
│   ├── ui/               shadcn/ui base components (restricted, never hand-edited)
│   ├── common/           app-wide compositions (Page, ModalShell, DataTable, ConfirmDialog…)
│   └── layout/           AppLayout, Sidebar, Topbar, BuildingSwitcher, PublicLayout
├── constants/            app constants, permission keys (mirror the backend)
├── features/<module>/    api/ · hooks/ · components/ · pages/ · schemas/ · utils/ (only those needed)
├── hooks/                cross-feature hooks
├── lib/                  pure helpers + library setup (cn, queryClient, logger, moduleAccess…)
├── routes/               paths.ts, routeConfig.ts, navigation.ts, route guards — frontend routing only
├── services/             HTTP plumbing only (apiClient, interceptors, auth endpoints)
├── store/                appStore.ts, hooks.ts, slices/, modules/, shared/ (Zustand)
├── styles/               globals.css — theme tokens
├── types/                API / domain types, one <module>.types.ts per module
└── test/                 Vitest setup (when tests are introduced)
```

## Conventions

- Imports use the `@/` alias and point at the declaring file; no `index.ts` barrels.
- Server data lives in TanStack Query; Zustand holds only shared client state.
- Components never call `services/` or a feature's `api/` directly — go through hooks.
- Frontend URLs (`routes/`) and backend endpoints (`services/`, `features/*/api`) never share a file.
- Colours come from theme tokens (`bg-background`, `text-primary`…) — no hex values in classes.
- No `any`, no `console` (lint errors).
- Porting old Seiyone markup (Tailwind v4) to v3: replace hard-coded `slate-*`/`teal-*` with tokens;
  v4 `shadow-xs`/`shadow-2xs` don't exist in v3; old `rounded-xl` (18px) is kept via the theme.
- Restart `pnpm dev` after editing `tailwind.config.ts`.

## Data layer pattern

Only call endpoints that exist in the backend contract — never invent paths, payloads or mock responses.

```
features/<module>/
├── api/<resource>Api.ts      plain functions on top of services/apiClient (apiGet/apiPost/…)
└── hooks/use<Resource>.ts    query keys + useQuery / useApiMutation wrappers
types/<module>.types.ts       response / payload types matching the backend
```

```ts
// api/<resource>Api.ts — endpoint paths live here, next to their feature
export const list<Resource>s = (params?: List<Resource>Params) =>
  apiGet<<Resource>[]>("/<path-from-backend-contract>", { params });

// hooks/use<Resource>.ts
export const <resource>Keys = {
  all: ["<resource>"] as const,
  list: (params?: List<Resource>Params) => [...<resource>Keys.all, "list", params] as const,
};
export function use<Resource>s(params?: List<Resource>Params) {
  const query = useQuery({ queryKey: <resource>Keys.list(params), queryFn: () => list<Resource>s(params) });
  useQueryErrorToast(query.error, "Could not load <resource>s.");
  return query;
}
export const useCreate<Resource> = () =>
  useApiMutation(create<Resource>, { invalidate: [<resource>Keys.all], successMessage: "<Resource> created." });
```

- Building-scoped lists put the active building id in both the params and the query key.
- `lib/queryClient.ts` sets the defaults (30 s stale time, no 4xx retries, mutations never retried).
- `lib/apiError.ts` turns errors into user messages; extend it once the backend error format is known.

## shadcn/ui

- Always use the Tailwind-v3-compatible CLI: `pnpm dlx shadcn@2.3.0 add <component>`.
  Newer CLI versions target Tailwind v4 and would rewrite the config.
- Never hand-edit files in `src/components/ui/`; customise through variants / wrappers in `common/`.
- Keep `tailwind-merge` on v2 (v3 only supports Tailwind v4).

## Commands

```
pnpm install
pnpm dev          # http://localhost:5173
pnpm typecheck    # tsc -b
pnpm lint         # eslint
pnpm build        # tsc -b && vite build
```

## Strict rules

### 1. Restricted files — ask before every change
- `src/services/**`, `src/routes/**`, `src/app/router.tsx`
- `src/components/ui/**`
- `src/styles/globals.css`, `tailwind.config.ts`
- `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `postcss.config.js`, `components.json`, `index.html`
- `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`
- `.env` — never read, print, copy or commit

Before editing any of them, list the files and the reason, and wait for confirmation.

### 2. Packages
- pnpm only. Never install, remove or upgrade packages without asking.
- Do not lower or remove `minimumReleaseAge` in `pnpm-workspace.yaml`.

### 3. Git
- Never commit, push, merge or open a PR unless explicitly asked.

### 4. No hallucination
- Use only files, packages and env vars that exist. No invented endpoints or mock API data.
- Never claim something works without running typecheck / lint / build.
