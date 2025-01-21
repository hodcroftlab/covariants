import { selector } from 'recoil'
import { fetchPerClusterDataRaw, PerClusterDataRaw } from 'src/io/getPerClusterData'
import { atomAsync } from 'src/state/utils/atomAsync'

export const perClusterDataAtom = atomAsync<PerClusterDataRaw>({
  key: 'perClusterData',
  async default() {
    return await fetchPerClusterDataRaw()
  },
})

export const perClusterDataDistributionsSelector = selector({
  key: 'perClusterDataDistributions',
  get: ({ get }) => {
    return get(perClusterDataAtom).distributions
  },
})
