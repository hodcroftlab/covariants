import React, { ReactElement } from 'react'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { Cases } from 'src/components/Cases/Cases'
import { FullWidthPage } from 'src/components/Layout/PageSizes/FullWidthPage'

export default function CasesPage() {
  return <Cases />
}

CasesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <FullWidthPage>
      <WithHeadline title={'Estimated Cases by Variant'}>{page}</WithHeadline>
    </FullWidthPage>
  )
}
