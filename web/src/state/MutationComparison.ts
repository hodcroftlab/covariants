import { atomAsync } from 'src/state/utils/atomAsync'
import { fetchMutationComparison } from 'src/io/getMutationComparison'

export const mutationComparisonAtom = atomAsync({
  key: 'mutationComparison',
  async default() {
    const { variants: rawVariants, sharedByCommonness, sharedByPos, individual } = await fetchMutationComparison()
    const variants = rawVariants.map((v) => {
      return {
        nextstrain: v.split('\n')[0].trim(),
        pangolin: v.split('\n')[1].trim().slice(1, -1),
      }
    })
    return { variants, sharedByCommonness, sharedByPos, individualMutations: individual }
  },
})
