import { selector } from 'recoil'
import { updateUrlQuery } from 'src/helpers/urlQuery'
import type { AtomEffectParams } from 'src/state/utils/atomEffect'
import { atomAsync } from 'src/state/utils/atomAsync'
import { ClusterDatum, fetchClusters } from 'src/io/getClusters'

export interface Cluster {
  cluster: string
  enabled: boolean
}

export const clustersAtom = atomAsync<ClusterDatum[]>({
  key: 'clusters',
  async default() {
    return await fetchClusters()
  },
})

export const clusterNamesSelector = selector({
  key: 'clusterNames',
  get: ({ get }) => {
    const clusters = get(clustersAtom)
    return clusters.map((cluster) => cluster.display_name)
  },
})

export const clusterBuildNamesSelector = selector({
  key: 'clusterBuildNames',
  get: ({ get }) => {
    const clusters = get(clustersAtom)
    return new Map<string, string>(clusters.map((c) => [c.display_name, c.build_name]))
  },
})

export const clusterRedirectsSelector = selector({
  key: 'clusterRedirects',
  get: ({ get }) => {
    const clusters = get(clustersAtom)
    return clusters.reduce((result, cluster) => {
      if (cluster.old_build_names) {
        cluster.old_build_names.forEach((oldName) => result.set(oldName, cluster.build_name))
      }
      return result
    }, new Map<string, string>())
  },
})

/** Toggles a given cluster enabled/disabled */
export function toggleCluster(clusters: Cluster[], clusterName: string): Cluster[] {
  return clusters.map((cluster) => {
    if (cluster.cluster === clusterName) {
      return { ...cluster, enabled: !cluster.enabled }
    }
    return cluster
  })
}

/** Toggles all clusters enabled */
export function enableAllClusters(clusters: Cluster[]): Cluster[] {
  return clusters.map((cluster) => ({ ...cluster, enabled: true }))
}

/** Toggles all clusters disabled */
export function disableAllClusters(clusters: Cluster[]): Cluster[] {
  return clusters.map((cluster) => ({ ...cluster, enabled: false }))
}

/** Atom effect which synchronizes list of selected clusters to URL query params */
export function updateUrlOnClustersSet({ onSet }: AtomEffectParams<Cluster[]>) {
  onSet((clusters: Cluster[]) => {
    // If all clusters are enabled, we will remove cluster url params
    const hasAllEnabled = clusters.every((cluster) => cluster.enabled)

    void updateUrlQuery({
      variant: hasAllEnabled ? [] : clusters.filter((cluster) => cluster.enabled).map((cluster) => cluster.cluster),
    })
  })
}
