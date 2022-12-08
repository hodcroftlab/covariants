import React, { Suspense } from 'react'
import { CasesPage as Page } from 'src/components/Cases/CasesPage'
import { LOADING } from 'src/components/Loading/Loading'

export default function CasesPage() {
  return (
    <Suspense fallback={LOADING}>
      <Page />
    </Suspense>
  )
}
