import React from 'react'
import { Home } from 'src/components/Home/Home'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { LimitedWidthPage } from 'src/components/Layout/PageSizes/LimitedWidthPage'

export default function HomePage() {
  return (
    <LimitedWidthPage>
      <WithHeadline title={'Covariants'}>
        <Home />
      </WithHeadline>
    </LimitedWidthPage>
  )
}
