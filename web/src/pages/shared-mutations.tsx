import React, { ReactElement } from 'react'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { SharedMutationsPage } from 'src/components/SharedMutations/SharedMutationsPage'
import { NarrowPage } from 'src/components/Layout/PageSizes/NarrowPage'

export default function SharedMutations() {
  return <SharedMutationsPage />
}

SharedMutations.getLayout = function getLayout(page: ReactElement) {
  return (
    <NarrowPage>
      <WithHeadline title={'Shared mutations'}>{page}</WithHeadline>
    </NarrowPage>
  )
}
