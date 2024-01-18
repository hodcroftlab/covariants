import copy from 'fast-copy'
import type { Cluster } from 'src/state/Clusters'
import { updateUrlQuery } from 'src/helpers/urlQuery'
import { fetchPerCountryDataRaw } from 'src/io/getPerCountryData'
import { atomFamilyAsync } from 'src/state/utils/atomAsync'

export const clustersForPerCountryAtom = atomFamilyAsync<Cluster[], string>({
  key: 'clustersForPerCountryAtom',
  async default(region: string) {
    const { regions } = await fetchPerCountryDataRaw()
    const perCountryData = regions.find((candidate) => candidate.region === region)
    if (!perCountryData) {
      throw new Error(`Per-country data not found for region: '${region}'`)
    }
    const clusterNames = copy(perCountryData.cluster_names).sort()
    return clusterNames.map((cluster) => ({ cluster, enabled: true }))
  },
  effects: [
    ({ onSet }) => {
      onSet(onClustersSet)
    },
  ],
})

function onClustersSet(clusters: Cluster[]) {
  // If all clusters are enabled, we will remove cluster url params
  const hasAllEnabled = clusters.every((cluster) => cluster.enabled)

  // eslint-disable-next-line no-void
  void updateUrlQuery({
    variant: hasAllEnabled ? [] : clusters.filter((cluster) => cluster.enabled).map((cluster) => cluster.cluster),
  })
}
