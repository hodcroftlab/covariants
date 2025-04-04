import React, { ReactElement } from 'react'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { CountryDistributionPage } from 'src/components/CountryDistribution/CountryDistributionPage'
import { FullWidthPage } from 'src/components/Layout/PageSizes/FullWidthPage'

export default function CountryDistribution() {
  return <CountryDistributionPage />
}

CountryDistribution.getLayout = function getLayout(page: ReactElement) {
  return (
    <FullWidthPage>
      <WithHeadline title={'Overview of Variants in Countries'}>{page}</WithHeadline>
    </FullWidthPage>
  )
}
