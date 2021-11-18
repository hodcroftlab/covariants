/** Given an object, get a set of keys for which the values has `enabled` property set to `true` */
export function getEnabledKeys(obj: Record<string, { enabled: boolean }>): Set<string> {
  return new Set(
    Object.entries(obj)
      .filter(([, value]) => value.enabled)
      .map(([key]) => key),
  )
}
