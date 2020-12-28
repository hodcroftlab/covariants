/**
 * Returns the first element of the array if non array is provided,
 * or `undefined` if empty array is provided, or passes through if
 * a non-array is provided.
 */
export function takeFirstMaybe<T>(maybeArray: T | T[]): T | undefined {
  if (!Array.isArray(maybeArray)) {
    return maybeArray
  }

  if (maybeArray.length > 0) {
    return maybeArray[0]
  }

  return undefined
}
