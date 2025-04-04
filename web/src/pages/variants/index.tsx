import React, { ReactElement } from 'react'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { VariantsIndex } from 'src/components/Variants/VariantsIndex'
import { LimitedWidthPage } from 'src/components/Layout/PageSizes/LimitedWidthPage'

export default function VariantsIndexPage() {
  return <VariantsIndex />
}

VariantsIndexPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LimitedWidthPage>
      <WithHeadline title={'Overview of Variants/Mutations'}>{page}</WithHeadline>
    </LimitedWidthPage>
  )
}
