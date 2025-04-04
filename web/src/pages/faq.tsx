import React, { ReactElement } from 'react'
import { FaqPage } from 'src/components/Faq/FaqPage'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { NarrowPage } from 'src/components/Layout/PageSizes/NarrowPage'

export default function Faq() {
  return <FaqPage />
}

Faq.getLayout = function getLayout(page: ReactElement) {
  return (
    <NarrowPage>
      <WithHeadline title={'Frequently asked questions'}>{page}</WithHeadline>
    </NarrowPage>
  )
}
