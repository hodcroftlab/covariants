import { useAxiosQuery } from 'src/hooks/useAxiosQuery'

export interface MutationComparisonResponse {
  variants: string[]
  shared_by_commonness: MutationShared[]
  shared_by_pos: MutationShared[]
  individual: MutationIndividualRow[]
}

export interface MutationShared {
  pos: number
  presence: Mutations
}

export interface MutationIndividualRow {
  index: number
  mutations: Mutations
}

export type Mutations = (string | null)[]

export function useMutationComparison() {
  return useAxiosQuery<MutationComparisonResponse>('/data/mutationComparison.json')
}
