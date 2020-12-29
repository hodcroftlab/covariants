import React from 'react'

import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import { ResponsiveContainer } from 'recharts'

import { theme } from 'src/theme'
import { PLOT_ASPECT_RATIO } from 'src/constants'
import { ChartContainerOuter, ChartContainerInner } from './PlotLayout'

const LoadingSpinner = styled(Loader)`
  display: flex;

  svg {
    margin: auto;
  }
`

export function PlotPlaceholder() {
  return (
    <ChartContainerOuter>
      <ChartContainerInner>
        <ResponsiveContainer aspect={PLOT_ASPECT_RATIO}>
          <LoadingSpinner type="ThreeDots" color={theme.gray400} />
        </ResponsiveContainer>
      </ChartContainerInner>
    </ChartContainerOuter>
  )
}
