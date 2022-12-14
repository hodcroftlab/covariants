import React, { ReactNode, useCallback } from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import { SetterOrUpdater } from 'src/types'

export interface CheckboxWithIconProps {
  label?: ReactNode
  Icon?: ReactNode
  checked: boolean
  setChecked: SetterOrUpdater<boolean>
}

export function CheckboxWithIcon({ label, Icon, checked, setChecked }: CheckboxWithIconProps) {
  const onChange = useCallback(() => {
    setChecked((checkedPrev) => !checkedPrev)
  }, [setChecked])

  return (
    <FormGroup check>
      <Label check>
        <Input type="checkbox" checked={checked} onChange={onChange} />
        {Icon ?? null}
        {label}
      </Label>
    </FormGroup>
  )
}
