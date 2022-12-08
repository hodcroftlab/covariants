import React, { Suspense } from 'react'
import { AcknowledgementsPage as Page } from 'src/components/Acknowledgements/AcknowledgementsPage'
import { LOADING } from 'src/components/Loading/Loading'

export default function AcknowledgementsPage() {
  return (
    <Suspense fallback={LOADING}>
      <Page />
    </Suspense>
  )
}
