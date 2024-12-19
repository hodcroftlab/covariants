import { z } from 'zod'
import { useValidatedAxiosQuery } from 'src/hooks/useAxiosQuery'

const mutations = z.string().nullable().array()

const mutationShared = z.object({
  pos: z.number(),
  presence: mutations,
})

const mutationIndividualRow = z.object({
  index: z.number(),
  mutations: mutations,
})

const mutationComparison = z.object({
  variants: z.string().array(),
  // eslint-disable-next-line camelcase
  shared_by_commonness: mutationShared.array(),
  // eslint-disable-next-line camelcase
  shared_by_pos: mutationShared.array(),
  individual: mutationIndividualRow.array(),
})

export type Mutations = z.infer<typeof mutations>

export type MutationComparison = z.infer<typeof mutationComparison>

export function useMutationComparison() {
  return useValidatedAxiosQuery<MutationComparison>('/data/mutationComparison.json', mutationComparison)
}
