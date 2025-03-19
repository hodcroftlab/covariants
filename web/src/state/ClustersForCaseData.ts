import {
  Cluster,
  clusterLineagesToDisplayNameMapSelector,
  extractEnabledClustersFromUrlQuery,
  updateUrlOnClustersSet,
} from './Clusters'

import { perCountryCasesDataSelector } from 'src/state/PerCountryCasesData'
import { atomDefault } from 'src/state/utils/atomDefault'

/**
 * Represents a list of currently enabled clusters (variants)
 */
export const clustersCasesAtom = atomDefault<Cluster[]>({
  key: 'clustersCases',
  default: ({ get }) => {
    const { clusters } = get(perCountryCasesDataSelector)
    const clusterPangoLineagesToDisplayNameMap = get(clusterLineagesToDisplayNameMapSelector)

    return extractEnabledClustersFromUrlQuery(clusters, clusterPangoLineagesToDisplayNameMap)
  },
  effects: [updateUrlOnClustersSet],
})
