import React from 'react'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { CountryDistribution } from 'src/components/CountryDistribution/CountryDistribution'
import { FullWidthPage } from 'src/components/Layout/PageSizes/FullWidthPage'

export default function CountryDistributionPage() {
  return (
    <FullWidthPage>
      <WithHeadline title={'Overview of Variants in Countries'}>
        <CountryDistribution />
      </WithHeadline>
    </FullWidthPage>
  )
}
