import React, { ReactElement } from 'react'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { CasesPage } from 'src/components/Cases/CasesPage'
import { FullWidthPage } from 'src/components/Layout/PageSizes/FullWidthPage'

export default function Cases() {
  return <CasesPage />
}

Cases.getLayout = function getLayout(page: ReactElement) {
  return (
    <FullWidthPage>
      <WithHeadline title={'Estimated Cases by Variant'}>{page}</WithHeadline>
    </FullWidthPage>
  )
}
