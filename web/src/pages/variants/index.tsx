import React from 'react'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { VariantsIndex } from 'src/components/Variants/VariantsIndex'
import { LimitedWidthPage } from 'src/components/Layout/PageSizes/LimitedWidthPage'

export default function VariantsIndexPage() {
  return (
    <LimitedWidthPage>
      <WithHeadline title={'Overview of Variants/Mutations'}>
        <VariantsIndex />
      </WithHeadline>
    </LimitedWidthPage>
  )
}
