import React, { useCallback } from 'react'

import type { StrictOmit } from 'ts-essentials'
import { styled } from 'styled-components'
import ReactToggle, { ToggleProps as ReactToggleProps } from 'react-toggle'
import 'react-toggle/style.css'

export const ToggleBase = styled(ReactToggle)<ReactToggleProps>`
  &.react-toggle-custom {
    & > .react-toggle-track {
      background-color: #9c3434;
    }

    &.react-toggle--checked > .react-toggle-track {
      background-color: #459f25;
    }

    &:hover {
      & > .react-toggle-track {
        background-color: #b95353;
      }

      &.react-toggle--checked > .react-toggle-track {
        background-color: #5db240;
      }
    }
  }
`

export interface TogglePropsWithoutChildren extends StrictOmit<ReactToggleProps, 'type' | 'value'> {
  identifier: string
  onCheckedChanged: (checked: boolean) => void
}

export type ToggleProps = React.PropsWithChildren<TogglePropsWithoutChildren>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Toggle({ identifier, className, onCheckedChanged, children, ...props }: ToggleProps) {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChanged(e.target.checked)
    },
    [onCheckedChanged],
  )

  const Result = <ToggleBase id={identifier} className="react-toggle-custom" onChange={onChange} {...props} />

  if (children) {
    return (
      <label htmlFor={identifier} className="d-flex m-0">
        <span className="me-2">{Result}</span>
        {children}
      </label>
    )
  }

  return Result
}
