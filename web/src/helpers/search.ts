import { partition } from 'lodash'

export function includesLowerCase(candidate: string, searchTerm: string): boolean {
  return candidate.toLowerCase().includes(searchTerm.toLowerCase())
}

export function startsWithLowerCase(candidate: string, searchTerm: string): boolean {
  return candidate.toLowerCase().startsWith(searchTerm.toLowerCase())
}

/** Parition array in 3 parts: items starting with term, items including term and items not including term */
export function search<T>(items: T[], term: string, getter: (item: T) => string[]) {
  const [itemsStartWith, itemsNotStartWith] = partition(items, (item) =>
    getter(item).some((candidate) => startsWithLowerCase(candidate, term)),
  )
  const [itemsInclude, itemsNotInclude] = partition(itemsNotStartWith, (item) =>
    getter(item).some((candidate) => includesLowerCase(candidate, term)),
  )
  return { itemsStartWith, itemsInclude, itemsNotInclude }
}
