import React, { Suspense } from 'react'
import { ClusterDistributionPage as Page } from 'src/components/ClusterDistribution/ClusterDistributionPage'
import { LOADING } from 'src/components/Loading/Loading'

export default function ClusterDistributionPage() {
  return (
    <Suspense fallback={LOADING}>
      <Page />
    </Suspense>
  )
}
