import copy from 'fast-copy'
import { updateUrlOnClustersSet } from 'src/state/Clusters'
import type { Cluster } from 'src/state/Clusters'
import { fetchPerCountryDataRaw } from 'src/io/getPerCountryData'
import { atomFamilyAsync } from 'src/state/utils/atomAsync'

export const clustersForPerCountryDataAtom = atomFamilyAsync<Cluster[], string>({
  key: 'clustersForPerCountryDataAtom',
  async default(region: string) {
    const { regions } = await fetchPerCountryDataRaw()
    const perCountryData = regions.find((candidate) => candidate.region === region)
    if (!perCountryData) {
      throw new Error(`Per-country data not found for region: '${region}'`)
    }
    const clusterNames = copy(perCountryData.cluster_names).sort()
    return clusterNames.map((cluster) => ({ cluster, enabled: true }))
  },
  effects: [updateUrlOnClustersSet],
})
