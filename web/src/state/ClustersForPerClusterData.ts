import Router from 'next/router'
import { get as getLodash } from 'lodash'
import { convertToArrayMaybe, includesCaseInsensitive } from 'src/helpers/array'
import { parseUrl } from 'src/helpers/parseUrl'
import {
  Cluster,
  clusterLineagesToDisplayNameMapSelector,
  clusterNamesSelector,
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

    const { query } = parseUrl(Router.asPath)
    const enabledClustersLineagesOrDisplayNames = convertToArrayMaybe(getLodash(query, 'variant'))

    if (enabledClustersLineagesOrDisplayNames) {
      const enabledClustersDisplayNames = enabledClustersLineagesOrDisplayNames.map(
        (displayNameOrLineage) =>
          clusterPangoLineagesToDisplayNameMap.get(displayNameOrLineage) ?? displayNameOrLineage,
      )
      return clusters.map((cluster) => ({
        ...cluster,
        enabled: includesCaseInsensitive(enabledClustersDisplayNames, cluster.cluster),
      }))
    }

    return clusters
  },
  effects: [updateUrlOnClustersSet],
})
