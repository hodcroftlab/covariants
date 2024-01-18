import { updateUrlQuery } from 'src/helpers/urlQuery'
import type { AtomEffectParams } from 'src/state/utils/atomEffect'

export interface Cluster {
  cluster: string
  enabled: boolean
}

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

    // eslint-disable-next-line no-void
    void updateUrlQuery({
      variant: hasAllEnabled ? [] : clusters.filter((cluster) => cluster.enabled).map((cluster) => cluster.cluster),
    })
  })
}
