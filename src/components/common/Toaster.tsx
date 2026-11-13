import type { ComponentProps } from "react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = ComponentProps<typeof Sonner>;

/** App-wide toast host (mounted with the application layout). Use `toast()` from "sonner" to show one. */
export function Toaster(props: ToasterProps) {
  return <Sonner position="top-right" closeButton richColors theme="light" {...props} />;
}
