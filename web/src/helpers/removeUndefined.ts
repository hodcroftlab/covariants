import { pickBy, identity } from 'lodash'

/**
 * Removes object keys which have `undefined` value
 */
export function removeUndefined<T>(obj: Record<string, T | undefined>) {
  return pickBy(obj, identity) as Record<string, T>
}
