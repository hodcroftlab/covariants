import { ErrorBoundary } from 'react-error-boundary'
import React, { Suspense } from 'react'
import { FetchError } from 'src/components/Error/FetchError'
import { LastUpdated } from 'src/components/Common/LastUpdated'
import { ChangelogButton } from 'src/components/Common/ChangelogButton'

export function Changelog() {
  return (
    <ChangelogButton className="d-flex ms-auto">
      <ErrorBoundary FallbackComponent={FetchError}>
        <Suspense>
          <LastUpdated className="d-flex ms-auto" />
        </Suspense>
      </ErrorBoundary>
    </ChangelogButton>
  )
}
