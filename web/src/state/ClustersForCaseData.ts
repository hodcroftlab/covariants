import Router from 'next/router'
import { get as getLodash, invert } from 'lodash'
import { Cluster, clusterPangoLineageMapSelector, updateUrlOnClustersSet } from './Clusters'

import { perCountryCasesDataSelector } from 'src/state/PerCountryCasesData'
import { atomDefault } from 'src/state/utils/atomDefault'
import { parseUrl } from 'src/helpers/parseUrl'
import { convertToArrayMaybe, includesCaseInsensitive } from 'src/helpers/array'

/**
 * Represents a list of currently enabled clusters (variants)
 */
export const clustersCasesAtom = atomDefault<Cluster[]>({
  key: 'clustersCases',
  default: ({ get }) => {
    const { clusters } = get(perCountryCasesDataSelector)
    const clusterDisplayNameToPangoLineageMap = get(clusterPangoLineageMapSelector)
    const clusterPangoLineageToDisplayNameMap = new Map(
      Object.entries(invert(Object.fromEntries(clusterDisplayNameToPangoLineageMap))),
    )

    const { query } = parseUrl(Router.asPath)
    const enabledClustersPangoMaybe = convertToArrayMaybe(getLodash(query, 'variant'))
    if (enabledClustersPangoMaybe) {
      const enabledClusters = enabledClustersPangoMaybe.map(
        (displayName) => clusterPangoLineageToDisplayNameMap.get(displayName) ?? displayName,
      )
      return clusters.map((cluster) => ({
        ...cluster,
        enabled: includesCaseInsensitive(enabledClusters, cluster.cluster),
      }))
    }

    return clusters
  },
  effects: [updateUrlOnClustersSet],
})
