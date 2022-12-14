import React from 'react'
import { useRouter } from 'next/router'
import ErrorPage from './_error'

export default function NotFoundPage() {
  const { asPath } = useRouter()
  const error: Error & { statusCode?: number } = new Error(`Page not found: ${asPath}`)
  error.statusCode = 404
  return <ErrorPage statusCode={error.statusCode} title={error.message} error={error} showDetails={false} />
}
