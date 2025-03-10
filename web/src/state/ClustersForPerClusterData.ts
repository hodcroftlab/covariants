import {
  Cluster,
  clusterLineagesToDisplayNameMapSelector,
  clusterNamesSelector,
  extractEnabledClustersFromUrlQuery,
  updateUrlOnClustersSet,
} from 'src/state/Clusters'
import { atomAsync } from 'src/state/utils/atomAsync'
import { sortClustersByClusterNames } from 'src/io/getClusters'
import { perClusterDataAtom } from 'src/state/PerClusterData'

export const clustersForPerClusterDataAtom = atomAsync<Cluster[]>({
  key: 'clustersForPerClusterDataAtom',
  async default({ get }) {
    const { distributions } = get(perClusterDataAtom)
    const allClusterNames = get(clusterNamesSelector)
    const clusterNames = distributions.map(({ cluster }) => cluster).sort()
    const unsortedClusters = clusterNames.map((cluster) => ({ cluster, enabled: true }))
    const clusters = sortClustersByClusterNames(unsortedClusters, allClusterNames)
    const clusterPangoLineagesToDisplayNameMap = get(clusterLineagesToDisplayNameMapSelector)

    return extractEnabledClustersFromUrlQuery(clusters, clusterPangoLineagesToDisplayNameMap)
  },
  effects: [updateUrlOnClustersSet],
})
