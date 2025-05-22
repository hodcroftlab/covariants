import React, { PropsWithChildren, useCallback, useState } from 'react'
import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart'
import { AreaChart, LineChart, ReferenceArea } from 'recharts'
import { useRecoilState } from 'recoil'
import { CategoricalChartState } from 'recharts/types/chart/types'
import { zoomWindowAtom } from 'src/state/Params'
import { theme } from 'src/theme'

interface ZoomWindow {
  left: number | undefined
  right: number | undefined
}

const resetZoomButtonStyle = {
  top: 16,
  right: 16,
}

export function ChartWithZoom({
  type,
  zoomAtomId,
  children,
  zoomWindowColor,
  ...rest
}: PropsWithChildren<
  {
    type: 'line' | 'area'
    zoomAtomId: string
    zoomWindowColor?: string
  } & CategoricalChartProps
>) {
  const ChartComponent = type === 'line' ? LineChart : AreaChart

  const [zoomWindow, setZoomWindow] = useRecoilState(zoomWindowAtom(zoomAtomId))
  const [selectedZoomWindow, setSelectedZoomWindow] = useState<ZoomWindow>({ left: undefined, right: undefined })

  const onMouseDown = useCallback((e: CategoricalChartState) => {
    if (e.activeLabel === undefined) {
      return
    }
    setSelectedZoomWindow((prevState) => ({
      ...prevState,
      left: Number(e.activeLabel),
    }))
  }, [])

  const onMouseMove = useCallback(
    (e: CategoricalChartState) => {
      if (selectedZoomWindow.left !== undefined && e.activeLabel !== undefined) {
        setSelectedZoomWindow((prevState) => ({
          ...prevState,
          right: Number(e.activeLabel),
        }))
      }
    },
    [selectedZoomWindow.left],
  )

  const onMouseUp = useCallback(() => {
    if (selectedZoomWindow.left !== undefined && selectedZoomWindow.right !== undefined) {
      const min = Math.min(selectedZoomWindow.left, selectedZoomWindow.right)
      const max = Math.max(selectedZoomWindow.left, selectedZoomWindow.right)

      setZoomWindow({ min, max })
    }
    setSelectedZoomWindow({ left: undefined, right: undefined })
  }, [selectedZoomWindow.left, selectedZoomWindow.right, setZoomWindow])

  const onResetZoomButtonClick = useCallback(() => {
    setZoomWindow(undefined)
  }, [setZoomWindow])

  const onMouseLeave = useCallback(() => {
    setSelectedZoomWindow({ left: undefined, right: undefined })
  }, [])

  return (
    <div className={'position-absolute'}>
      <ChartComponent
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        {...rest}
      >
        {children}
        {selectedZoomWindow.left !== undefined && selectedZoomWindow.right !== undefined ? (
          <ReferenceArea
            x1={selectedZoomWindow.left}
            x2={selectedZoomWindow.right}
            fill={zoomWindowColor ?? theme.gray500}
            fillOpacity={0.5}
            isFront={true}
            ifOverflow={'visible'}
          />
        ) : null}
      </ChartComponent>
      {zoomWindow && (
        <button
          className={'position-absolute btn btn-sm btn-light'}
          style={resetZoomButtonStyle}
          onClick={onResetZoomButtonClick}
          title={'Reset zoom'}
        >
          <div className="bi bi-arrow-clockwise"></div>
          <div className="visually-hidden">Reset zoom</div>
        </button>
      )}
    </div>
  )
}
