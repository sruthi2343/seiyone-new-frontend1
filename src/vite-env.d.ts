/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend base URL (see .env.example). */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
