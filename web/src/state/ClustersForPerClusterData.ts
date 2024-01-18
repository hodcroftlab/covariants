import { Cluster, updateUrlOnClustersSet } from 'src/state/Clusters'
import { fetchPerClusterDataRaw } from 'src/io/getPerClusterData'
import { atomAsync } from 'src/state/utils/atomAsync'
import { sortClusters } from 'src/io/getClusters'

export const clustersForPerClusterDataAtom = atomAsync<Cluster[]>({
  key: 'clustersForPerClusterDataAtom',
  async default() {
    const { distributions } = await fetchPerClusterDataRaw()
    const clusterNames = distributions.map(({ cluster }) => cluster).sort()
    return sortClusters(clusterNames.map((cluster) => ({ cluster, enabled: true })))
  },
  effects: [updateUrlOnClustersSet],
})
