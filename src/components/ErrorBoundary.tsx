import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleClearStorage = () => {
    try {
      localStorage.removeItem("urin-motors-cars");
      localStorage.removeItem("urin-motors-cars-overrides");
      localStorage.removeItem("urin-motors-cars-deleted");
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 text-foreground">
          <div className="max-w-md w-full border border-border p-8 text-center space-y-6 bg-card">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 mx-auto flex items-center justify-center text-xl font-bold">
              !
            </div>
            <div>
              <h2 className="text-xl font-light mb-2">Алдаа гарлаа</h2>
              <p className="text-sm text-muted-foreground">
                Системд алдаа гарсан тул хуудсыг дахин ачаална уу.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                onClick={this.handleReload}
                className="rounded-none uppercase tracking-wider w-full"
              >
                Хуудсыг дахин ачаалах
              </Button>
              <Button
                variant="outline"
                onClick={this.handleClearStorage}
                className="rounded-none text-xs text-muted-foreground w-full"
              >
                Кэш цэвэрлээд дахин ачаалах
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
