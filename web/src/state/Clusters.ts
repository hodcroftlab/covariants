export interface Cluster {
  cluster: string
  enabled: boolean
}

// export const clustersForPerClusterAtom = atom<Cluster[]>({
//   key: 'clustersForPerClusterAtom',
//   effects: [
//     ({ onSet }) => {
//       onSet(onClustersSet)
//     },
//   ],
// })

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
