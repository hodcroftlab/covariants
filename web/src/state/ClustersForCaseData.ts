import type { Cluster } from './Clusters'

import { updateUrlQuery } from 'src/helpers/urlQuery'
import { fetchPerCountryCasesData } from 'src/io/getPerCountryCasesData'
import { atomAsync } from 'src/state/utils/atomAsync'

/**
 * Represents a list of currently enabled clusters (variants)
 */
export const clustersCasesAtom = atomAsync<Cluster[]>({
  key: 'clustersCases',
  async default() {
    const clusters = await fetchPerCountryCasesData()
    return clusters.clusters
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
