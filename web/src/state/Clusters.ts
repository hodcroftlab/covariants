import type { ClusterDatum } from 'src/io/getClusters'
import { atom } from 'recoil'

export interface Cluster {
  cluster: string
  enabled: boolean
}

export const currentClusterAtom = atom<ClusterDatum>({
  key: 'currentClusterAtom',
  default: undefined,
})
