import Router from 'next/router'
import { get as getLodash } from 'lodash'
import { Cluster, updateUrlOnClustersSet } from './Clusters'

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
