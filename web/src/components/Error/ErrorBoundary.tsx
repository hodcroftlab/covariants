import React, { ReactNode } from 'react'

import { ErrorBoundary as ErrorBoundaryBase, FallbackProps } from 'react-error-boundary'
import ErrorPage from 'src/pages/_error'

export function ErrorFallback({ error }: FallbackProps) {
  return <ErrorPage error={error} />
}

export interface ErrorBoundaryProps {
  children?: ReactNode
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return <ErrorBoundaryBase FallbackComponent={ErrorFallback}>{children}</ErrorBoundaryBase>
}
