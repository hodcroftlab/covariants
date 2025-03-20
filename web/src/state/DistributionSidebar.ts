import { atom } from 'jotai'

export const clusterSidebarCollapsedAtoms = {
  perVariant: atom(true),
  perCountry: atom(false),
  cases: atom(false),
}

export const countriesSidebarCollapsedAtoms = {
  perVariant: atom(false),
  perCountry: atom(true),
  cases: atom(false),
}
