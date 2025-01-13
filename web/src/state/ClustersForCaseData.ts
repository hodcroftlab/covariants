import { atom } from 'recoil'
import type { Cluster } from './Clusters'

import { updateUrlQuery } from 'src/helpers/urlQuery'
import { getPerCountryCasesData } from 'src/io/getPerCountryCasesData'

function getAllClusters(): Cluster[] {
  return getPerCountryCasesData().clusters
}

/**
 * Represents a list of currently enabled clusters (variants)
 */
export const clustersCasesAtom = atom<Cluster[]>({
  key: 'clustersCases',
  default: getAllClusters(),
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
