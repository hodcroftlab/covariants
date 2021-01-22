import mutationComparison from 'src/../data/mutationComparison.json'

export interface MutationComparisonVariant {
  variant: string
  nonsynonymous: string[]
}

export function getMutationComparison(): MutationComparisonVariant[] {
  return mutationComparison.variants
}
