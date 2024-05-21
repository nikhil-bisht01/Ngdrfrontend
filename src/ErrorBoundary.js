import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error(error, errorInfo);
  }

  handleHookError = (error, info) => {
    this.setState({ hasError: true, error, errorInfo: info });
    console.error(error, info);
  };

  componentDidMount() {
    const originalUseEffect = React.useEffect;
    React.useEffect = (effect, deps) => {
      originalUseEffect(() => {
        try {
          effect();
        } catch (error) {
          this.handleHookError(error, { componentStack: 'useEffect' });
        }
      }, deps);
    };

    const originalUseState = React.useState;
    React.useState = (initialState) => {
      try {
        return originalUseState(initialState);
      } catch (error) {
        this.handleHookError(error, { componentStack: 'useState' });
        return [initialState, () => {}];
      }
    };
  }

  render() {
    try {
      if (this.state.hasError) {
        return (
          <div>
            <h1>Something went wrong.</h1>
            {this.state.error && <p>{this.state.error.toString()}</p>}
            {this.state.errorInfo && <p>{this.state.errorInfo.componentStack}</p>}
          </div>
        );
      }

      return this.props.children;
    } catch (error) {
      this.componentDidCatch(error, { componentStack: 'render' });
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{error.toString()}</p>
        </div>
      );
    }
  }
}

export default ErrorBoundary;
