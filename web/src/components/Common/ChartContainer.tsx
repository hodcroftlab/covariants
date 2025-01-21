import React, { useMemo } from 'react'
import { useResizeDetector, useResizeDetectorProps } from 'react-resize-detector'
import { useInView } from 'react-intersection-observer'

import { ChartContainerInner, ChartContainerOuter } from './PlotLayout'
import { FadeIn } from './FadeIn'
import { theme } from 'src/theme'

interface ChartContainerDimensions {
  width: number
  height: number
}

export interface ChartContainerProps {
  resizeOptions?: useResizeDetectorProps<HTMLElement>
  children: (dimensions: ChartContainerDimensions) => React.ReactNode
}

export function ChartContainer({ children, resizeOptions }: ChartContainerProps) {
  const { width = 0, ref: resizeRef } = useResizeDetector({ handleWidth: true, ...resizeOptions })
  const { inView, ref: intersectionRef } = useInView({ fallbackInView: true })
  const dimensions = useMemo(() => ({ width, height: width / theme.plot.aspectRatio }), [width])
  const childrenWithDims = useMemo(() => children(dimensions), [children, dimensions])

  return (
    <ChartContainerOuter ref={resizeRef}>
      <ChartContainerInner>
        <div ref={intersectionRef} style={dimensions}>
          {inView && <FadeIn>{childrenWithDims}</FadeIn>}
        </div>
      </ChartContainerInner>
    </ChartContainerOuter>
  )
}
