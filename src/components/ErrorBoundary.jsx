import { Component } from "react";

/** Pattern: Error Boundary — catch render errors, show fallback UI. */
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-lg px-5 py-24 text-center">
          <h1 className="font-display text-2xl font-bold">Something went wrong.</h1>
          <p className="mt-3 text-sm text-muted">Refresh the page or go back home.</p>
          <a href="/" className="mt-6 inline-block border border-line px-4 py-2 text-sm hover:border-fg">
            Home
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}
