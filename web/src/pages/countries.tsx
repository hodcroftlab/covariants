import React, { Suspense } from 'react'
import { CountriesPage as Page } from 'src/components/Countries/CountriesPage'
import { LOADING } from 'src/components/Loading/Loading'

export default function CountriesPage() {
  return (
    <Suspense fallback={LOADING}>
      <Page />
    </Suspense>
  )
}
