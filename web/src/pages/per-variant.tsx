import React, { ReactElement } from 'react'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { ClusterDistribution } from 'src/components/ClusterDistribution/ClusterDistribution'
import { FullWidthPage } from 'src/components/Layout/PageSizes/FullWidthPage'

export default function ClusterDistributionPage() {
  return <ClusterDistribution />
}

ClusterDistributionPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <FullWidthPage>
      <WithHeadline title={'Overview of Variants/Mutations'}>{page}</WithHeadline>
    </FullWidthPage>
  )
}
