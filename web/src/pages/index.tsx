import React, { ReactElement } from 'react'
import { Home } from 'src/components/Home/Home'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { LimitedWidthPage } from 'src/components/Layout/PageSizes/LimitedWidthPage'

export default function HomePage() {
  return <Home />
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LimitedWidthPage>
      <WithHeadline title={'Covariants'}>{page}</WithHeadline>
    </LimitedWidthPage>
  )
}
