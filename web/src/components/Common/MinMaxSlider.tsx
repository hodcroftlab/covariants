import React from 'react'
import styled from 'styled-components'

import Slider from './Slider'

const Container = styled.div`
  & {
    --thumb-space: 1.5rem;
    display: grid;
    width: 100%;
    padding: 0;
    z-index: 0;
    @media (min-width: 768px) {
      --thumb-space: 1rem;
    }
  }

  & input,
  &::before,
  &::after {
    grid-area: 1/1;
    align-self: center;
  }

  & input {
    pointer-events: none;
    z-index: 1;
    -webkit-appearance: none;
    min-width: 200px;
  }

  & input:first-of-type {
    padding-right: var(--thumb-space);
  }
  & input:last-of-type {
    padding-left: var(--thumb-space);
  }

  & input[type='range']::-webkit-slider-runnable-track {
    background: none !important;
    box-shadow: none !important;
    border: none !important;
  }
  & input[type='range']::-moz-range-track {
    background: none !important;
    box-shadow: none !important;
    border: none !important;
  }

  & input[type='range']::-webkit-slider-thumb {
    pointer-events: auto;
    width: var(--thumb-space);
    height: var(--thumb-space);
    margin-top: calc(var(--thumb-space) / -2 + 4px);
  }
  & input[type='range']::-moz-range-thumb {
    pointer-events: auto;
    width: var(--thumb-space);
    height: var(--thumb-space);
    margin-top: calc(var(--thumb-space) / -2 + 4px);
  }

  &::before,
  &::after {
    content: '';
    margin: 1px 2px;
    height: 8px;
  }

  &::before {
    border-radius: 4px;
    box-sizing: border-box;
    background: #efefef;
    border: 1px solid #ccc;
  }

  &::after {
    --bg: transparent;
    --fg: #aac;
    --length: calc(var(--max, 0) - var(--min, 100));
    --min-pct: calc((var(--min-v) / var(--length)) * 100% - var(--thumb-space) / 2);
    --max-pct: calc((var(--max-v) / var(--length)) * 100% + var(--thumb-space) / 2);
    margin: 2px calc(var(--thumb-space) - 2px);
    background: linear-gradient(
      to right,
      var(--bg),
      var(--bg) var(--min-pct),
      var(--fg) var(--min-pct),
      var(--fg) var(--max-pct),
      var(--bg) var(--max-pct)
    );
    clip-path: inset(0px calc(100% - var(--max-pct)) 0px var(--min-pct));
  }
`

function MinMaxSlider({ min, max, minValue, maxValue, onMinChange, onMaxChange, className, style, ...props }) {
  const _style = React.useMemo(
    () => ({
      ...style,
      '--min': min,
      '--max': max,
      '--min-v': minValue,
      '--max-v': maxValue,
    }),
    [min, max, minValue, maxValue],
  )

  const _onMinChange = React.useCallback(
    (e) => {
      onMinChange(Math.min(e.target.value, maxValue))
    },
    [maxValue, onMinChange],
  )

  const _onMaxChange = React.useCallback(
    (e) => {
      onMaxChange(Math.max(e.target.value, minValue))
    },
    [minValue, onMaxChange],
  )

  return (
    <Container className={className} style={_style} {...props}>
      <Slider min={min} max={max} value={minValue} onChange={_onMinChange} />
      <Slider min={min} max={max} value={maxValue} onChange={_onMaxChange} />
    </Container>
  )
}

export default MinMaxSlider
