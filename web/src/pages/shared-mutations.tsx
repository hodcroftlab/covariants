import React from 'react'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { SharedMutations } from 'src/components/SharedMutations/SharedMutations'
import { LimitedWidthPage } from 'src/components/Layout/PageSizes/LimitedWidthPage'

export default function SharedMutationsPage() {
  return (
    <LimitedWidthPage>
      <WithHeadline title={'Shared mutations'}>
        <SharedMutations />
      </WithHeadline>
    </LimitedWidthPage>
  )
}
