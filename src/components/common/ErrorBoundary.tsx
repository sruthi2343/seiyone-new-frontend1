import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type ErrorBoundaryProps = {
  children: ReactNode;
  /** When this value changes (e.g. the route path), a shown error is cleared. */
  resetKey?: unknown;
  /** Reports the error (e.g. to a logger); the boundary itself never logs. */
  onError?: (error: Error, info: ErrorInfo) => void;
};

type ErrorBoundaryState = { error: Error | null };

// A previous release can still be open when a deployment replaces lazy chunks; only a reload fixes that.
const CHUNK_LOAD_ERROR =
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Unable to preload CSS|Loading chunk .+ failed/i;

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.state.error && !Object.is(prevProps.resetKey, this.props.resetKey)) {
      this.setState({ error: null });
    }
  }

  private retry = () => {
    if (CHUNK_LOAD_ERROR.test(this.state.error?.message ?? "")) window.location.reload();
    else this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div role="alert" className="flex min-h-[400px] flex-col items-center justify-center p-6 text-center">
        <div className="mb-4 max-w-md rounded-lg bg-destructive/10 p-4 text-destructive">
          <h2 className="mb-2 text-lg font-semibold">Something went wrong</h2>
          <p className="text-sm">{error.message}</p>
        </div>
        <Button onClick={this.retry}>Try again</Button>
      </div>
    );
  }
}
