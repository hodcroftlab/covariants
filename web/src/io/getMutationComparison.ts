/* eslint-disable camelcase */
import { variants, shared_by_commonness, shared_by_pos, individual } from 'src/../data/mutationComparison.json'

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

export function getMutationComparisonSharedByPos(): MutationShared[] {
  return shared_by_pos
}

export function getMutationComparisonSharedByCommonness(): MutationShared[] {
  return shared_by_commonness
}

export function getMutationComparisonIndividual(): MutationIndividualRow[] {
  return individual
}
