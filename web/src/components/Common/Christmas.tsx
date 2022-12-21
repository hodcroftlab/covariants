import styled from 'styled-components'
import React, { CSSProperties, HTMLProps, useMemo } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import SnowfallBase from 'react-snowfall'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { DateTime } from 'luxon'
import { TbSnowflake, TbSnowflakeOff } from 'react-icons/tb'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SurpriseSanta from 'surprise-santa'
import { persistAtom } from 'src/state/persist/localStorage'
import { ToggleTwoLabels } from 'src/components/Common/ToggleTwoLabels'
import { ErrorBoundaryIgnore } from 'src/components/Common//ErrorBoundaryIgnore'

const enableChristmasAtom = atom<boolean>({
  key: 'enableChristmasAtom',
  default: true,
  effects: [persistAtom],
})

function useIsChristmas(): boolean {
  const enableChristmas = useRecoilValue(enableChristmasAtom)
  return useMemo(() => {
    const now = DateTime.now()
    return enableChristmas && ((now.month === 12 && now.day >= 20) || (now.month === 1 && now.day <= 20))
  }, [enableChristmas])
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
    return [...Array<number>(Math.ceil(width / (15 + 8)) + 1).keys()].map((i) => <li key={i} />)
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
  return (
    <ErrorBoundaryIgnore>
      <SnowfallBase style={SNOWFALL_STYLE} />
    </ErrorBoundaryIgnore>
  )
}

export function Santa() {
  const isChristmas = useIsChristmas()
  if (!isChristmas) {
    return null
  }
  return (
    <ErrorBoundaryIgnore>
      <SurpriseSanta minTime={30} maxTime={180} />
    </ErrorBoundaryIgnore>
  )
}

export function ChristmasLightRope() {
  const isChristmas = useIsChristmas()
  if (!isChristmas) {
    return null
  }
  return (
    <ErrorBoundaryIgnore>
      <ChristmasLightRopeStyled />
    </ErrorBoundaryIgnore>
  )
}

const SNOWFLAKE_ICON_ON = <TbSnowflake className="mt-1" color="#1200ff88" />
const SNOWFLAKE_ICON_OFF = <TbSnowflakeOff className="mt-1" color="#aa001288" />

export function ChristmasToggle() {
  const [enableChristmas, setEnableChristmas] = useRecoilState(enableChristmasAtom)
  return (
    <ToggleTwoLabels
      identifier="christmas-toggle"
      title="Let it snow!"
      checked={enableChristmas}
      onCheckedChanged={setEnableChristmas}
      labelLeft={SNOWFLAKE_ICON_ON}
      labelRight={SNOWFLAKE_ICON_OFF}
    />
  )
}
