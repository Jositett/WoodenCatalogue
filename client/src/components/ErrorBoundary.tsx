
import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F3E9] dark:bg-gray-900">
          <div className="text-center">
            <h2 className="text-2xl font-playfair text-[#7D5A50] dark:text-amber-300 mb-4">
              Something went wrong
            </h2>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#7D5A50] hover:bg-[#5C4033] text-white px-4 py-2 rounded"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
