import React, { Suspense } from 'react'
import { CountryDistributionPage as Page } from 'src/components/CountryDistribution/CountryDistributionPage'
import { LOADING } from 'src/components/Loading/Loading'

export default function CountryDistributionPage() {
  return (
    <Suspense fallback={LOADING}>
      <Page />
    </Suspense>
  )
}
