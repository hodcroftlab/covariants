import React, { PropsWithChildren } from 'react'

/** Error boundary which suppresses all errors */
export class ErrorBoundaryIgnore<P> extends React.Component<PropsWithChildren<P>> {
  componentDidCatch() {
    // errors are ignored
  }

  render() {
    const { children } = this.props
    // children always rendered
    return children
  }
}
