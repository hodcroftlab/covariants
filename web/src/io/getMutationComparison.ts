import { variants, presence } from 'src/../data/mutationComparison.json'

export interface MutationComparisonPresence {
  pos: number
  presence: (string | null)[]
}

export function getMutationComparisonVariants(): string[] {
  return variants
}

export function getMutationComparisonPresence(): MutationComparisonPresence[] {
  return presence
}
