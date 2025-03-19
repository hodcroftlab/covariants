/**
 * Converts non-undefined non-array value to an array
 */
export function convertToArrayMaybe<T>(value: T | T[] | undefined): T[] | undefined {
  if (Array.isArray(value)) {
    return value
  }
  if (value) {
    return [value]
  }
  return undefined
}

/**
 * Returns the first element of the array if a non-array is provided,
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

export function joinAllMaybe(maybeArray: string | string[] | undefined): string | undefined {
  if (!Array.isArray(maybeArray)) {
    return maybeArray
  }

  if (maybeArray.length > 0) {
    return maybeArray.join('/')
  }

  return undefined
}

/**
 * Checks if a string is present in an array of strings, case insensitive
 * (i.e. same as Array.includes() but the string comparison ignores case
 */
export function includesCaseInsensitive(arr: string[], val: string): boolean {
  return arr.some((elem) => elem.toLowerCase() === val.toLowerCase())
}
