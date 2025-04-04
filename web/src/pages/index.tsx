import React, { ReactElement } from 'react'
import { HomePage } from 'src/components/Home/HomePage'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { NarrowPage } from 'src/components/Layout/PageSizes/NarrowPage'

export default function Home() {
  return <HomePage />
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <NarrowPage>
      <WithHeadline title={'Covariants'}>{page}</WithHeadline>
    </NarrowPage>
  )
}
