import Router from 'next/router'
import { get } from 'lodash'
import { convertToArrayMaybe, includesCaseInsensitive } from 'src/helpers/array'
import { parseUrl } from 'src/helpers/parseUrl'
import { Cluster, updateUrlOnClustersSet } from 'src/state/Clusters'
import { fetchPerClusterDataRaw } from 'src/io/getPerClusterData'
import { atomAsync } from 'src/state/utils/atomAsync'
import { sortClusters } from 'src/io/getClusters'

export const clustersForPerClusterDataAtom = atomAsync<Cluster[]>({
  key: 'clustersForPerClusterDataAtom',
  async default() {
    const { distributions } = await fetchPerClusterDataRaw()
    const clusterNames = distributions.map(({ cluster }) => cluster).sort()
    const clusters = sortClusters(clusterNames.map((cluster) => ({ cluster, enabled: true })))

    const { query } = parseUrl(Router.asPath)
    const enabledClusters = convertToArrayMaybe(get(query, 'variant'))
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
