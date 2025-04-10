import React from 'react'
import { Faq } from 'src/components/Faq/Faq'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { LimitedWidthPage } from 'src/components/Layout/PageSizes/LimitedWidthPage'

export default function FaqPage() {
  return (
    <LimitedWidthPage>
      <WithHeadline title={'Frequently asked questions'}>
        <Faq />
      </WithHeadline>
    </LimitedWidthPage>
  )
}
