import Router from 'next/router'
import { get as getLodash } from 'lodash'
import { convertToArrayMaybe, includesCaseInsensitive } from 'src/helpers/array'
import { parseUrl } from 'src/helpers/parseUrl'
import { Cluster, clusterNamesSelector, updateUrlOnClustersSet } from 'src/state/Clusters'
import { atomAsync } from 'src/state/utils/atomAsync'
import { sortClustersByClusterNames } from 'src/io/getClusters'
import { perClusterDataAtom } from 'src/state/perClusterData'

export const clustersForPerClusterDataAtom = atomAsync<Cluster[]>({
  key: 'clustersForPerClusterDataAtom',
  async default({ get }) {
    const { distributions } = get(perClusterDataAtom)
    const allClusterNames = get(clusterNamesSelector)
    const clusterNames = distributions.map(({ cluster }) => cluster).sort()
    const unsortedClusters = clusterNames.map((cluster) => ({ cluster, enabled: true }))
    const clusters = sortClustersByClusterNames(unsortedClusters, allClusterNames)

    const { query } = parseUrl(Router.asPath)
    const enabledClusters = convertToArrayMaybe(getLodash(query, 'variant'))
    if (enabledClusters) {
      return clusters.map((cluster) => ({
        ...cluster,
        enabled: includesCaseInsensitive(enabledClusters, cluster.cluster),
      }))
    }

    return clusters
  },
  effects: [updateUrlOnClustersSet],
})
