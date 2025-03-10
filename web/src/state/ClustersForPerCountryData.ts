import copy from 'fast-copy'
import { get as getLodash } from 'lodash'
import Router from 'next/router'
import { convertToArrayMaybe, includesCaseInsensitive } from 'src/helpers/array'
import { parseUrl } from 'src/helpers/parseUrl'
import { clusterLineagesToDisplayNameMapSelector, updateUrlOnClustersSet } from 'src/state/Clusters'
import type { Cluster } from 'src/state/Clusters'
import { fetchPerCountryDataRaw } from 'src/io/getPerCountryData'
import { atomFamilyAsync } from 'src/state/utils/atomAsync'

export const clustersForPerCountryDataAtom = atomFamilyAsync<Cluster[], string>({
  key: 'clustersForPerCountryData',
  async default(region: string, { get }) {
    const { regions } = await fetchPerCountryDataRaw()
    const perCountryData = regions.find((candidate) => candidate.region === region)
    if (!perCountryData) {
      throw new Error(`Per-country data not found for region: '${region}'`)
    }
    const clusterNames = copy(perCountryData.cluster_names).sort()
    const clusters = clusterNames.map((cluster) => ({ cluster, enabled: true }))
    const clusterPangoLineagesToDisplayNameMap = get(clusterLineagesToDisplayNameMapSelector)

    const { query } = parseUrl(Router.asPath)
    const enabledClustersLineagesOrDisplayNames = convertToArrayMaybe(getLodash(query, 'variant'))
    if (enabledClustersLineagesOrDisplayNames) {
      const enabledClustersDisplayNames = enabledClustersLineagesOrDisplayNames.map(
        (displayNameOrLineage) =>
          clusterPangoLineagesToDisplayNameMap.get(displayNameOrLineage) ?? displayNameOrLineage,
      )
      return clusters.map((cluster) => ({
        ...cluster,
        enabled: includesCaseInsensitive(enabledClustersDisplayNames, cluster.cluster),
      }))
    }

    return clusters
  },
  effects: [updateUrlOnClustersSet],
})
