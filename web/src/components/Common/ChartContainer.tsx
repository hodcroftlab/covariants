import React, { useMemo } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { Props as ResizeDetectorProps } from 'react-resize-detector/build/types/ResizeDetector'
import { useInView } from 'react-intersection-observer'

import { theme } from 'src/theme'
import { ChartContainerInner, ChartContainerOuter } from './PlotLayout'
import { FadeIn } from './FadeIn'

type ChartContainerDimensions = {
  width: number
  height: number
}

export interface ChartContainerProps {
  resizeOptions?: ResizeDetectorProps
  children: (dimensions: ChartContainerDimensions) => React.ReactNode
}

export function ChartContainer({ children, resizeOptions }: ChartContainerProps) {
  // @ts-ignore
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
