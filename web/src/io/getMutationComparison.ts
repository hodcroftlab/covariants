/* eslint-disable camelcase */
import { z } from 'zod'
import { FETCHER } from 'src/hooks/useAxiosQuery'

const mutationsSchema = z.string().nullable().array()

const mutationSharedSchema = z.object({
  pos: z.number(),
  presence: mutationsSchema,
})

const mutationIndividualRowSchema = z.object({
  index: z.number(),
  mutations: mutationsSchema,
})

const mutationComparisonSchemaRaw = z.object({
  variants: z.string().array(),
  shared_by_commonness: mutationSharedSchema.array(),
  shared_by_pos: mutationSharedSchema.array(),
  individual: mutationIndividualRowSchema.array(),
})

const mutationComparisonSchema = mutationComparisonSchemaRaw.transform(
  ({ shared_by_pos, shared_by_commonness, ...rest }) => ({
    sharedByPos: shared_by_pos,
    sharedByCommonness: shared_by_commonness,
    ...rest,
  }),
)

export type Mutations = z.infer<typeof mutationsSchema>

export type MutationComparison = z.infer<typeof mutationComparisonSchema>

export async function fetchMutationComparison() {
  const mutationComparison = await FETCHER.validatedFetch('/data/mutationComparison.json', mutationComparisonSchemaRaw)
  return mutationComparisonSchema.parse(mutationComparison)
}
