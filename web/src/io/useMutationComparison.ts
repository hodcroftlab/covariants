import { z } from 'zod'
import { useValidatedAxiosQuery } from 'src/hooks/useAxiosQuery'

const mutationsSchema = z.string().nullable().array()

const mutationSharedSchema = z.object({
  pos: z.number(),
  presence: mutationsSchema,
})

const mutationIndividualRowSchema = z.object({
  index: z.number(),
  mutations: mutationsSchema,
})

const mutationComparisonSchema = z.object({
  variants: z.string().array(),
  // eslint-disable-next-line camelcase
  shared_by_commonness: mutationSharedSchema.array(),
  // eslint-disable-next-line camelcase
  shared_by_pos: mutationSharedSchema.array(),
  individual: mutationIndividualRowSchema.array(),
})

export type Mutations = z.infer<typeof mutationsSchema>

export type MutationComparison = z.infer<typeof mutationComparisonSchema>

export function useMutationComparison() {
  return useValidatedAxiosQuery<MutationComparison>('/data/mutationComparison.json', mutationComparisonSchema)
}
