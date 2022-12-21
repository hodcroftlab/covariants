import styled from 'styled-components'
import React, { CSSProperties, HTMLProps, ReactNode, useMemo } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import SnowfallBase from 'react-snowfall'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SurpriseSanta from 'surprise-santa'
import { DateTime } from 'luxon'

function useIsChristmas() {
  return useMemo(() => {
    const now = DateTime.now()
    return (now.month === 12 && now.day >= 20) || (now.month === 1 && now.day <= 20)
  }, [])
}

const ChristmasLightRopeStyled = styled(ChristmasLightRopeImpl)`
  margin-top: 8px;
`

function ChristmasLightRopeImpl(props: HTMLProps<HTMLDivElement>) {
  const { width, ref } = useResizeDetector()

  const lights = useMemo(() => {
    if (!width) {
      return null
    }

    const li = <li />
    return Array<ReactNode>(Math.ceil(width / (15 + 8)) + 1).fill(li)
  }, [width])

  return (
    <div {...props}>
      <ul ref={ref} className="lightrope">
        {lights}
      </ul>
    </div>
  )
}

const SNOWFALL_STYLE: CSSProperties = { position: 'fixed' }

export function Snowfall() {
  const isChristmas = useIsChristmas()
  if (!isChristmas) {
    return null
  }
  return <SnowfallBase style={SNOWFALL_STYLE} />
}

export function Santa() {
  const isChristmas = useIsChristmas()
  if (!isChristmas) {
    return null
  }
  return <SurpriseSanta minTime={30} maxTime={180} />
}

export function ChristmasLightRope() {
  const isChristmas = useIsChristmas()
  if (!isChristmas) {
    return null
  }
  return <ChristmasLightRopeStyled />
}
