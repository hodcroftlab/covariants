import { selector } from 'recoil'
import Router from 'next/router'
import { get as getLodash } from 'lodash'
import { updateUrlQuery } from 'src/helpers/urlQuery'
import type { AtomEffectParams } from 'src/state/utils/atomEffect'
import { atomAsync } from 'src/state/utils/atomAsync'
import { CLUSTER_NAME_OTHERS, ClusterDatum, fetchClusters } from 'src/io/getClusters'
import { theme } from 'src/theme'
import { notUndefinedOrNull } from 'src/helpers/notUndefined'
import { enablePangolinAtom } from 'src/state/Nomenclature'
import { parseUrl } from 'src/helpers/parseUrl'
import { convertToArrayMaybe, includesCaseInsensitive } from 'src/helpers/array'

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
    return clusters.filter((cluster) => !cluster.hasNoPage)
  },
})

export const clusterNamesSelector = selector({
  key: 'clusterNames',
  get: ({ get }) => {
    const clusters = get(clustersAtom)
    return clusters.map((cluster) => cluster.displayName)
  },
})

export const hasPageClusterNamesSelector = selector({
  key: 'hasPageClusterNames',
  get: ({ get }) => {
    const clusters = get(hasPageClustersSelector)
    return clusters.map((cluster) => cluster.displayName)
  },
})

export const noPageClusterNamesSelector = selector({
  key: 'noPageClusterNames',
  get: ({ get }) => {
    const clusters = get(clustersAtom)
    return clusters.filter((cluster) => cluster.hasNoPage).map((cluster) => cluster.displayName)
  },
})

export const clusterDisplayNameToBuildNameMapSelector = selector({
  key: 'clusterDisplayNameToBuildNameMap',
  get: ({ get }) => {
    const clusters = get(clustersAtom)
    return new Map<string, string>(clusters.map((c) => [c.displayName, c.buildName]))
  },
})

/** This map contains *only the first* pango lineage, so display names remain unique. **/
export const clusterDisplayNameToLineageMapSelector = selector({
  key: 'clusterDisplayNameToLineageMap',
  get: ({ get }) => {
    const clusters = get(clustersAtom)
    return new Map<string, string>(
      clusters
        .map((c) => [
          c.displayName,
          c.pangoLineages ? (c.pangoLineages[0] ? c.pangoLineages[0].name : undefined) : undefined,
        ])
        .filter(([, pangoName]) => pangoName !== undefined) as [string, string][],
    )
  },
})

/** This map contains *all* pango lineages **/
export const clusterDisplayNameToLineagesMapSelector = selector({
  key: 'clusterDisplayNameToLineagesMap',
  get: ({ get }) => {
    const clusters = get(clustersAtom)
    return new Map<string, string[]>(
      clusters
        .map((c) => [c.displayName, c.pangoLineages?.map((lin) => lin.name) ?? undefined])
        .filter(([, pangoName]) => pangoName !== undefined) as [string, string[]][],
    )
  },
})

/** Careful, this is not the inverse of {@link clusterBuildNameToLineageMapSelector}! This map contains *all* pango lineages! **/
export const clusterLineagesToBuildNameMapSelector = selector({
  key: 'clusterLineagesToBuildNameMap',
  get: ({ get }) => {
    const clusters = get(clustersAtom)
    return new Map<string, string>(
      clusters
        .flatMap((c) => c.pangoLineages?.map((lineage) => [lineage.name, c.buildName]))
        .filter(notUndefinedOrNull) as [string, string][],
    )
  },
})

/** Careful, this is not the inverse of {@link clusterLineagesToBuildNameMapSelector}! This map contains *only the first* pango lineage, so build names remain unique. **/
export const clusterBuildNameToLineageMapSelector = selector({
  key: 'clusterBuildNameToLineageMap',
  get: ({ get }) => {
    const clusters = get(clustersAtom)
    return new Map<string, string>(
      clusters
        .map((c) => [c.buildName, c.pangoLineages?.[0]?.name])
        .filter(([, pangoName]) => pangoName !== undefined) as [string, string][],
    )
  },
})

export const clusterLineagesToDisplayNameMapSelector = selector({
  key: 'clusterLineagesToDisplayNameMap',
  get: ({ get }) => {
    const clusters = get(clustersAtom)
    return new Map<string, string>(
      clusters
        .flatMap((c) => c.pangoLineages?.map((lineage) => [lineage.name, c.displayName]))
        .filter(notUndefinedOrNull) as [string, string][],
    )
  },
})

export const hasPageClusterBuildNamesSelector = selector({
  key: 'hasPageClusterBuildNames',
  get: ({ get }) => {
    const clusters = get(hasPageClustersSelector)
    return clusters.map((cluster) => cluster.buildName)
  },
})

export const hasPageClusterOldBuildNamesSelector = selector({
  key: 'hasPageClusterOldBuildNames',
  get: ({ get }) => {
    const clusters = get(hasPageClustersSelector)
    return clusters.flatMap((cluster) => cluster.oldBuildNames).filter(notUndefinedOrNull)
  },
})

export const clusterRedirectsSelector = selector({
  key: 'clusterRedirects',
  get: ({ get }) => {
    const clusters = get(hasPageClustersSelector)
    return clusters.reduce((result, cluster) => {
      if (cluster.oldBuildNames) {
        cluster.oldBuildNames.forEach((oldName) => result.set(oldName, cluster.buildName))
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

      const found = clusters.find(({ displayName }) => displayName === clusterName)
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
export function updateUrlOnClustersSet({ onSet, getPromise }: AtomEffectParams<Cluster[]>) {
  onSet((clusters: Cluster[]) => {
    // If all clusters are enabled, we will remove cluster url params
    const hasAllEnabled = clusters.every((cluster) => cluster.enabled)
    const variants = hasAllEnabled
      ? []
      : clusters.filter((cluster) => cluster.enabled).map((cluster) => cluster.cluster)

    // Map display names to pango lineages if pango nomenclature is enabled
    Promise.all([getPromise(clusterDisplayNameToLineageMapSelector), getPromise(enablePangolinAtom)])
      .then(([lineageMap, enablePangolin]) => {
        return updateUrlQuery({
          variant: enablePangolin
            ? variants.map((displayName) => lineageMap.get(displayName) ?? displayName)
            : variants,
        })
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new Error(error)
      })
  })
}

export function extractEnabledClustersFromUrlQuery(clusters: Cluster[], lineagesMap: Map<string, string>) {
  const { query } = parseUrl(Router.asPath)
  const enabledClustersLineagesOrDisplayNames = convertToArrayMaybe(getLodash(query, 'variant'))

  if (enabledClustersLineagesOrDisplayNames) {
    const enabledClustersDisplayNames = enabledClustersLineagesOrDisplayNames.map(
      (displayNameOrLineage) => lineagesMap.get(displayNameOrLineage) ?? displayNameOrLineage,
    )
    return clusters.map((cluster) => ({
      ...cluster,
      enabled: includesCaseInsensitive(enabledClustersDisplayNames, cluster.cluster),
    }))
  }

  return clusters
}
