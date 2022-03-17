import mutationComparisonJson from 'src/../data/mutationComparison.json'

export interface MutationShared {
  pos: number
  presence: (string | null)[]
}

export interface MutationIndividualRow {
  index: number
  mutations: (string | null)[]
}

export function getMutationComparisonVariants(): string[] {
  return mutationComparisonJson.variants
}

export function getMutationComparisonSharedByPos(): MutationShared[] {
  return mutationComparisonJson.shared_by_pos
}

export function getMutationComparisonSharedByCommonness(): MutationShared[] {
  return mutationComparisonJson.shared_by_commonness
}

export function getMutationComparisonIndividual(): MutationIndividualRow[] {
  return mutationComparisonJson.individual
}
