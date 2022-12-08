import React, { Suspense } from 'react'
import { FaqPage as Page } from 'src/components/Faq/FaqPage'
import { LOADING } from 'src/components/Loading/Loading'

export default function FaqPage() {
  return (
    <Suspense fallback={LOADING}>
      <Page />
    </Suspense>
  )
}
