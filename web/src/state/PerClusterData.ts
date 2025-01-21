import { selector, selectorFamily } from 'recoil'
import { ClusterDistributionDatum, fetchPerClusterDataRaw, PerClusterDataRaw } from 'src/io/getPerClusterData'
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

export const perClusterDataCountryNamesSelector = selector({
  key: 'perClusterDataCountryNames',
  get: ({ get }) => {
    return get(perClusterDataAtom).country_names
  },
})

export const perClusterDataDistributionSelector = selectorFamily<ClusterDistributionDatum[], string>({
  key: 'perClusterDataDistribution',
  get:
    (clusterName) =>
    ({ get }) => {
      const clusterDistributions = get(perClusterDataDistributionsSelector)
      const clusterDistribution = clusterDistributions.find((dist) => dist.cluster === clusterName)
      if (!clusterDistribution) {
        throw new Error(`Cluster distribution not found for cluster '${clusterName}'`)
      }
      return clusterDistribution.distribution
    },
})
