import React from 'react'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { ClusterDistribution } from 'src/components/ClusterDistribution/ClusterDistribution'
import { FullWidthPage } from 'src/components/Layout/PageSizes/FullWidthPage'

export default function ClusterDistributionPage() {
  return (
    <FullWidthPage>
      <WithHeadline title={'Overview of Variants/Mutations'}>
        <ClusterDistribution />
      </WithHeadline>
    </FullWidthPage>
  )
}
