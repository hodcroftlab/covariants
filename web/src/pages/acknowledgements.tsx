import React from 'react'
import { WithHeadline } from 'src/components/Layout/WithHeadline'
import { Acknowledgements } from 'src/components/Acknowledgements/Acknowledgements'
import { LimitedWidthPage } from 'src/components/Layout/PageSizes/LimitedWidthPage'

export default function AcknowledgementsPage() {
  return (
    <LimitedWidthPage>
      <WithHeadline title={'Acknowledgements'}>
        <Acknowledgements />
      </WithHeadline>
    </LimitedWidthPage>
  )
}
