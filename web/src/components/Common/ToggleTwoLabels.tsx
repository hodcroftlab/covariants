import React, { ReactNode, useCallback } from 'react'

import { styled } from 'styled-components'
import ReactToggle, { ToggleProps as ReactToggleProps } from 'react-toggle'
import 'react-toggle/style.css'
import { StrictOmit } from 'ts-essentials'

export const Label = styled.label`
  flex: 0;
  display: flex;
  gap: 0.25rem;
  align-items: center;
  word-wrap: normal;
  text-overflow: clip;
  white-space: nowrap;
`

export const ToggleTwoLabelsBase = styled(ReactToggle)<ReactToggleProps>`
  &.react-toggle-two-labels-custom {
    & > .react-toggle-track {
      background-color: #aac;
    }

    .react-toggle-thumb {
      border-color: #aac;
    }

    &.react-toggle--checked > .react-toggle-track {
      background-color: #aac;
    }

    &.react-toggle--checked .react-toggle-thumb {
      border-color: #aac;
    }

    &:hover {
      & > .react-toggle-track {
        background-color: #aac;
      }

      &.react-toggle--checked > .react-toggle-track {
        background-color: #aac;
      }
    }
  }
`

export interface ToggleTwoLabelsProps extends StrictOmit<ReactToggleProps, 'type' | 'value'> {
  identifier: string
  onCheckedChanged: (checked: boolean) => void
  labelLeft?: ReactNode
  labelRight?: ReactNode
  title?: string
  className?: string
}

export function ToggleTwoLabels({
  identifier,
  onCheckedChanged,
  labelLeft,
  labelRight,
  className,
  title,
  ...props
}: ToggleTwoLabelsProps) {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChanged(e.target.checked)
    },
    [onCheckedChanged],
  )

  return (
    <Label htmlFor={identifier} className={className} title={title}>
      {labelRight}
      <ToggleTwoLabelsBase
        id={identifier}
        className="react-toggle-two-labels-custom"
        icons={false}
        onChange={onChange}
        {...props}
      />
      {labelLeft}
    </Label>
  )
}
