/* eslint-disable lodash/prefer-is-nil */

export function notUndefined<T>(x: T | undefined): x is T {
  return x !== undefined
}

export function notUndefinedOrNull<T>(x: T | undefined): x is T {
  return x !== undefined && x !== null
}
