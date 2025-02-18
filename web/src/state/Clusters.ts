import { selector } from 'recoil'
import { updateUrlQuery } from 'src/helpers/urlQuery'
import type { AtomEffectParams } from 'src/state/utils/atomEffect'
import { atomAsync } from 'src/state/utils/atomAsync'
import { CLUSTER_NAME_OTHERS, ClusterDatum, fetchClusters } from 'src/io/getClusters'
import { theme } from 'src/theme'
import { notUndefinedOrNull } from 'src/helpers/notUndefined'

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

export const hasPageClustersSelector = selector({
  key: 'hasPageClusters',
  get: ({ get }) => {
    const clusters = get(clustersAtom)
    return clusters.filter((cluster) => !cluster.has_no_page)
  },
})

export const clusterNamesSelector = selector({
  key: 'clusterNames',
  get: ({ get }) => {
    const clusters = get(clustersAtom)
    return clusters.map((cluster) => cluster.display_name)
  },
})

export const hasPageClusterNamesSelector = selector({
  key: 'hasPageClusterNames',
  get: ({ get }) => {
    const clusters = get(hasPageClustersSelector)
    return clusters.map((cluster) => cluster.display_name)
  },
})

export const noPageClusterNamesSelector = selector({
  key: 'noPageClusterNames',
  get: ({ get }) => {
    const clusters = get(clustersAtom)
    return clusters.filter((cluster) => cluster.has_no_page).map((cluster) => cluster.display_name)
  },
})

export const clusterBuildNamesMapSelector = selector({
  key: 'clusterBuildNamesMap',
  get: ({ get }) => {
    const clusters = get(clustersAtom)
    return new Map<string, string>(clusters.map((c) => [c.display_name, c.build_name]))
  },
})

export const clusterPangoLineageMapSelector = selector({
  key: 'clusterPangoLineageMap',
  get: ({ get }) => {
    const clusters = get(clustersAtom)
    return new Map<string, string>(
      clusters.map((c) => [
        c.display_name,
        c.pango_lineages ? (c.pango_lineages[0] ? c.pango_lineages[0].name : c.display_name) : c.display_name,
      ]),
    )
  },
})

export const hasPageClusterBuildNamesSelector = selector({
  key: 'hasPageClusterBuildNames',
  get: ({ get }) => {
    const clusters = get(hasPageClustersSelector)
    return clusters.map((cluster) => cluster.build_name)
  },
})

export const hasPageClusterOldBuildNamesSelector = selector({
  key: 'hasPageClusterOldBuildNames',
  get: ({ get }) => {
    const clusters = get(hasPageClustersSelector)
    return clusters.flatMap((cluster) => cluster.old_build_names).filter(notUndefinedOrNull)
  },
})

export const clusterRedirectsSelector = selector({
  key: 'clusterRedirects',
  get: ({ get }) => {
    const clusters = get(hasPageClustersSelector)
    return clusters.reduce((result, cluster) => {
      if (cluster.old_build_names) {
        cluster.old_build_names.forEach((oldName) => result.set(oldName, cluster.build_name))
      }
      return result
    }, new Map<string, string>())
  },
})

export const getClusterColorsSelector = selector({
  key: 'clusterColors',
  get: ({ get }) => {
    const clusters = get(clustersAtom)

    return (clusterName: string) => {
      if (clusterName === CLUSTER_NAME_OTHERS) {
        return theme.clusters.color.others
      }

      // eslint-disable-next-line camelcase
      const found = clusters.find(({ display_name }) => display_name === clusterName)
      return found ? found.col : theme.clusters.color.unknown
    }
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
