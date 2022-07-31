import React from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { Props as ResizeDetectorProps } from 'react-resize-detector/build/ResizeDetector'
import { useInView } from 'react-intersection-observer'

import { theme } from 'src/theme'
import { ChartContainerInner, ChartContainerOuter } from './PlotLayout'
import FadeIn from './FadeIn'

type ChartContainerDimensions = {
  width: number
  height: number
}

type RenderChart = (dimensions: ChartContainerDimensions) => React.ReactNode

export interface ChartContainerProps {
  children: RenderChart
  resizeOptions?: ResizeDetectorProps
}

export function ChartContainer({ children, resizeOptions }: ChartContainerProps) {
  const { width = 0, ref: resizeRef } = useResizeDetector({ handleWidth: true, ...resizeOptions })
  const { inView, ref: intersectionRef } = useInView({
    fallbackInView: true,
  })

  const dimensions = React.useMemo(
    () => ({
      width,
      height: width / theme.plot.aspectRatio,
    }),
    [width],
  )

  return (
    <ChartContainerOuter ref={resizeRef}>
      <ChartContainerInner>
        <div ref={intersectionRef} style={dimensions}>
          {inView && <FadeIn>{children(dimensions)}</FadeIn>}
        </div>
      </ChartContainerInner>
    </ChartContainerOuter>
  )
}
