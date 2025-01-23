import { Cluster } from './Clusters'

import { updateUrlQuery } from 'src/helpers/urlQuery'
import { perCountryCasesDataSelector } from 'src/state/PerCountryCasesData'
import { atomDefault } from 'src/state/utils/atomDefault'

/**
 * Represents a list of currently enabled clusters (variants)
 */
export const clustersCasesAtom = atomDefault<Cluster[]>({
  key: 'clustersCases',
  default: ({ get }) => {
    const data = get(perCountryCasesDataSelector)

    return data.clusters
  },
  effects: [
    ({ onSet }) => {
      onSet((clusters) => {
        // If all clusters are enabled, we will remove cluster url params
        const hasAllEnabled = clusters.every((cluster) => cluster.enabled)

        void updateUrlQuery({
          variant: hasAllEnabled ? [] : clusters.filter((cluster) => cluster.enabled).map((cluster) => cluster.cluster),
        })
      })
    },
  ],
})
