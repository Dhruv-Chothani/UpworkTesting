import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4">
          <h2 className="text-xl font-bold text-red-600">Something went wrong</h2>
          {this.state.error && (
            <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto">
              {this.state.error.toString()}
              {this.state.error.stack && (
                <div className="mt-2 text-sm text-gray-600">
                  {this.state.error.stack}
                </div>
              )}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
