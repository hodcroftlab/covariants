import React, { ReactElement } from 'react'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { Acknowledgements } from 'src/components/Acknowledgements/Acknowledgements'
import { LimitedWidthPage } from 'src/components/Layout/PageSizes/LimitedWidthPage'

export default function AcknowledgementsPage() {
  return <Acknowledgements />
}

AcknowledgementsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LimitedWidthPage>
      <WithHeadline title={'Acknowledgements'}>{page}</WithHeadline>
    </LimitedWidthPage>
  )
}
