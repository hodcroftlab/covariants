import { variants, presence } from 'src/../data/mutationComparison.json'

export interface MutationComparisonPresence {
  mutation: string
  presence: boolean[]
}

export function getMutationComparisonVariants(): string[] {
  return variants
}

export function getMutationComparisonPresence(): MutationComparisonPresence[] {
  return presence
}
