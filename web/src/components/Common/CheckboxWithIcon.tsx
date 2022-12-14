import React, { ReactNode, useCallback } from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import { SetterOrUpdater } from 'src/types'
import styled from 'styled-components'

export interface CheckboxWithIconProps {
  label?: string
  Icon?: ReactNode
  checked: boolean
  setChecked: SetterOrUpdater<boolean>
}

export function CheckboxWithIcon({ label, Icon = null, checked, setChecked }: CheckboxWithIconProps) {
  const onChange = useCallback(() => {
    setChecked((checkedPrev) => !checkedPrev)
  }, [setChecked])

  return (
    <FormGroup check title={label}>
      <Label check>
        <Input type="checkbox" checked={checked} onChange={onChange} />
        <FlagAlignment>
          {Icon}
          <span>{label}</span>
        </FlagAlignment>
      </Label>
    </FormGroup>
  )
}

const FlagAlignment = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 0.25em;

  > * + * {
    margin-left: 0.5em;
  }
`
