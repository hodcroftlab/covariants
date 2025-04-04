import React, { ReactElement } from 'react'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { SharedMutations } from 'src/components/SharedMutations/SharedMutations'
import { LimitedWidthPage } from 'src/components/Layout/PageSizes/LimitedWidthPage'

export default function SharedMutationsPage() {
  return <SharedMutations />
}

SharedMutationsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LimitedWidthPage>
      <WithHeadline title={'Shared mutations'}>{page}</WithHeadline>
    </LimitedWidthPage>
  )
}
