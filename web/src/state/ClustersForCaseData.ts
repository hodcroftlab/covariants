import Router from 'next/router'
import { get as getLodash } from 'lodash'
import { Cluster, clusterLineagesToDisplayNameMapSelector, updateUrlOnClustersSet } from './Clusters'

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
