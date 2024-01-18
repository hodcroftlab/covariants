import { DefaultValue } from 'recoil'

export function isDefaultValue(candidate: unknown): candidate is DefaultValue {
  return candidate instanceof DefaultValue
}
