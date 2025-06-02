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
