import React, { ReactElement } from 'react'
import { Faq } from 'src/components/Faq/Faq'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { LimitedWidthPage } from 'src/components/Layout/PageSizes/LimitedWidthPage'

export default function FaqPage() {
  return <Faq />
}

FaqPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LimitedWidthPage>
      <WithHeadline title={'Frequently asked questions'}>{page}</WithHeadline>
    </LimitedWidthPage>
  )
}
