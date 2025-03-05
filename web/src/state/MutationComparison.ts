import { atom, selector } from 'recoil'
import { fetchMutationComparison } from 'src/io/getMutationComparison'

export const fetchMutCompSelector = selector({
  key: 'fetchMutComp',
  get: fetchMutComp,
})

export const mutationComparisonAtom = atom({
  key: 'mutationComparison',
  default: fetchMutCompSelector,
})

export async function fetchMutComp() {
  const { variants: rawVariants, sharedByCommonness, sharedByPos, individual } = await fetchMutationComparison()
  const variants = rawVariants.map((v) => {
    return {
      nextstrain: v.split('\n')[0].trim(),
      pangolin: v.split('\n')[1].trim().slice(1, -1),
    }
  })
  return { variants, sharedByCommonness, sharedByPos, individualMutations: individual }
}
