import React, { ReactElement } from 'react'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { ClusterDistributionPage } from 'src/components/ClusterDistribution/ClusterDistributionPage'
import { FullWidthPage } from 'src/components/Layout/PageSizes/FullWidthPage'

export default function ClusterDistribution() {
  return <ClusterDistributionPage />
}

ClusterDistribution.getLayout = function getLayout(page: ReactElement) {
  return (
    <FullWidthPage>
      <WithHeadline title={'Overview of Variants/Mutations'}>{page}</WithHeadline>
    </FullWidthPage>
  )
}
