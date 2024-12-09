import React from 'react'

import { styled } from 'styled-components'
import { ThreeDots as ThreeDotsLoader } from 'react-loader-spinner'
import { ResponsiveContainer } from 'recharts'

import { ChartContainerOuter, ChartContainerInner } from './PlotLayout'
import { theme } from 'src/theme'

const LoadingSpinner = styled(ThreeDotsLoader)`
  display: flex;

  svg {
    margin: auto;
  }
`

export function PlotPlaceholder() {
  return (
    <ChartContainerOuter>
      <ChartContainerInner>
        <ResponsiveContainer aspect={theme.plot.aspectRatio}>
          <LoadingSpinner color={theme.gray400} />
        </ResponsiveContainer>
      </ChartContainerInner>
    </ChartContainerOuter>
  )
}
