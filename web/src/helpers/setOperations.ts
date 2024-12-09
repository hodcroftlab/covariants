export function intersection<T>(a: Set<T>, b: Set<T>) {
  return new Set(Array.from(a).filter((i) => b.has(i)))
}
