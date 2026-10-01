import { Component } from 'react';

import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      'Application error:',
      error,
      errorInfo,
    );
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary">
          <div className="error-boundary__content">
            <p className="error-boundary__eyebrow">
              Something went wrong
            </p>

            <h1>
              We couldn't load this page.
            </h1>

            <p>
              Please refresh the page and try again.
              If the problem continues, contact
              Dceetechbro.
            </p>

            <button
              type="button"
              onClick={this.handleRefresh}
            >
              Refresh page
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;