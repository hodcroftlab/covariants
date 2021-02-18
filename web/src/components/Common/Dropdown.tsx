import React from 'react'

import Select, { ValueType, Props as SelectProps } from 'react-select'

import { DropdownOption } from 'src/components/Common/DropdownOption'

export interface DropdownProps extends SelectProps {
  identifier: string
  className?: string
  options: DropdownOption<string>[]
  defaultOption?: DropdownOption<string>
  value?: DropdownOption<string>

  onValueChange?(value: string): void

  onOptionChange?(option: DropdownOption<string>): void

  onBlur?<T>(e: React.FocusEvent<T>): void
}

export function Dropdown({
  className,
  identifier,
  options,
  defaultOption,
  value,
  onOptionChange,
  onValueChange,
  onBlur,
  ...restProps
}: DropdownProps) {
  return (
    <Select
      className={className}
      id={identifier}
      name={identifier}
      options={options}
      defaultValue={defaultOption}
      value={value}
      isMulti={false}
      onChange={(option: ValueType<DropdownOption<string>, false>) => {
        if (option) {
          onValueChange?.(option.value)
          onOptionChange?.(option)
        }
      }}
      onBlur={onBlur}
      {...restProps}
    />
  )
}
