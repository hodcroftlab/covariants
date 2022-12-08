import React, { Suspense } from 'react'
import { SharedMutationsPage as Page } from 'src/components/SharedMutations/SharedMutationsPage'
import { LOADING } from 'src/components/Loading/Loading'

export default function SharedMutationsPage() {
  return (
    <Suspense fallback={LOADING}>
      <Page />
    </Suspense>
  )
}
