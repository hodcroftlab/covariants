import React, { useCallback } from 'react'

import Select from 'react-select'
import type { ActionMeta, OnChangeValue } from 'react-select/dist/declarations/src/types'
import type { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'

import { DropdownOption } from 'src/components/Common/DropdownOption'

export type IsMultiValue = false

export interface DropdownProps extends StateManagerProps<DropdownOption<string>, IsMultiValue> {
  identifier: string
  defaultOption?: DropdownOption<string>
  onValueChange?(value: string): void
  onOptionChange?(option: DropdownOption<string>): void
}

export function Dropdown({
  className,
  identifier,
  options,
  defaultOption,
  value,
  onOptionChange,
  onValueChange,
  ...restProps
}: DropdownProps) {
  const handleChange = useCallback(
    (option: OnChangeValue<DropdownOption<string>, IsMultiValue>, _actionMeta: ActionMeta<DropdownOption<string>>) => {
      if (option) {
        onValueChange?.(option.value)
        onOptionChange?.(option)
      }
    },
    [onOptionChange, onValueChange],
  )

  return (
    <Select
      className={className}
      id={identifier}
      name={identifier}
      options={options}
      defaultValue={defaultOption}
      value={value}
      isMulti={false}
      onChange={handleChange}
      {...restProps}
    />
  )
}
