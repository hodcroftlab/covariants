import React, { Suspense } from 'react'
import { HomePage as Page } from 'src/components/Home/HomePage'
import { LOADING } from 'src/components/Loading/Loading'

export default function HomePage() {
  return (
    <Suspense fallback={LOADING}>
      <Page />
    </Suspense>
  )
}
