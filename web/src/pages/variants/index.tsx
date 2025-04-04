import React, { ReactElement } from 'react'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { VariantsIndexPage } from 'src/components/Variants/VariantsIndexPage'
import { NarrowPage } from 'src/components/Layout/PageSizes/NarrowPage'

export default function VariantsIndex() {
  return <VariantsIndexPage />
}

VariantsIndex.getLayout = function getLayout(page: ReactElement) {
  return (
    <NarrowPage>
      <WithHeadline title={'Overview of Variants/Mutations'}>{page}</WithHeadline>
    </NarrowPage>
  )
}
