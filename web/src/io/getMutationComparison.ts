import { variants, shared, individual } from 'src/../data/mutationComparison.json'

export interface MutationShared {
  pos: number
  presence: (string | null)[]
}

export interface MutationIndividualRow {
  index: number
  mutations: (string | null)[]
}

export function getMutationComparisonVariants(): string[] {
  return variants
}

export function getMutationComparisonShared(): MutationShared[] {
  return shared
}

export function getMutationComparisonIndividual(): MutationIndividualRow[] {
  return individual
}
