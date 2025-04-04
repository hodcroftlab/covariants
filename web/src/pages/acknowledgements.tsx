import React, { ReactElement } from 'react'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { AcknowledgementsPage } from 'src/components/Acknowledgements/AcknowledgementsPage'
import { NarrowPage } from 'src/components/Layout/PageSizes/NarrowPage'

export default function Acknowledgements() {
  return <AcknowledgementsPage />
}

Acknowledgements.getLayout = function getLayout(page: ReactElement) {
  return (
    <NarrowPage>
      <WithHeadline title={'Acknowledgements'}>{page}</WithHeadline>
    </NarrowPage>
  )
}
