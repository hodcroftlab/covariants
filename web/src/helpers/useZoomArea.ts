import { useState, useCallback, useMemo } from 'react'
import { CategoricalChartFunc } from 'recharts/types/chart/generateCategoricalChart'

import { theme } from 'src/theme'

const hoverStyle = { cursor: 'cell' }

type ZoomAreaValues = [number, number]

export function useZoomArea(onChange: (zoomArea: ZoomAreaValues) => void) {
  const [zoomArea, setZoomArea] = useState<ZoomAreaValues | undefined>()
  const [hovering, setHovering] = useState(false)

  const handleMouseDown = useCallback<CategoricalChartFunc>((e) => {
    if (e && e.activeLabel) {
      const value = Number.parseFloat(e.activeLabel)
      setZoomArea([value, value])
    }
  }, [])

  const handleMouseMove = useCallback<CategoricalChartFunc>(
    (e) => {
      if (e && e.activeLabel) {
        setHovering(true)
        if (zoomArea) {
          const value = Number.parseFloat(e.activeLabel)
          setZoomArea([zoomArea[0], value])
        }
      } else {
        setHovering(false)
      }
    },
    [zoomArea],
  )

  const handleMouseUp = useCallback<CategoricalChartFunc>(() => {
    if (zoomArea) {
      if (zoomArea[0] !== zoomArea[1]) {
        onChange(zoomArea[0] < zoomArea[1] ? zoomArea : [zoomArea[1], zoomArea[0]])
      }
      setZoomArea(undefined)
    }
  }, [zoomArea, onChange])

  const isZooming = useMemo(() => {
    return zoomArea && zoomArea[0] !== zoomArea[1]
  }, [zoomArea])

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    isZooming,
    style: hovering ? hoverStyle : null,
    zoomArea,
  }
}

export const zoomAreaStyleProps = {
  fill: theme.black,
  fillOpacity: 0.25,
}
