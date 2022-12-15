import React, { useCallback } from 'react'
import Select from 'react-select'
import type { ActionMeta, OnChangeValue } from 'react-select/dist/declarations/src/types'
import type { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'

export type IsMultiValue = false

export interface DropdownWithSearchProps extends StateManagerProps<DropdownOption<string>, IsMultiValue> {
  defaultOption?: DropdownOption<string>
  onValueChange?(value: string): void
  onOptionChange?(option: DropdownOption<string>): void
}

export function DropdownWithSearch({
  options,
  defaultOption,
  value,
  onOptionChange,
  onValueChange,
  ...restProps
}: DropdownWithSearchProps) {
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
      options={options}
      defaultValue={defaultOption}
      value={value}
      isMulti={false}
      onChange={handleChange}
      {...restProps}
    />
  )
}

export interface DropdownOption<ValueType extends string | number> {
  value: ValueType
  label: string
}

export function stringToOption(value: string): DropdownOption<string> {
  return { value, label: value }
}

export function stringsToOptions(values: string[]): DropdownOption<string>[] {
  return values.map(stringToOption)
}
