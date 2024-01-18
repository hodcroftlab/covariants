import copy from 'fast-copy'
import { get } from 'lodash'
import Router from 'next/router'
import { convertToArrayMaybe, includesCaseInsensitive } from 'src/helpers/array'
import { parseUrl } from 'src/helpers/parseUrl'
import { updateUrlOnClustersSet } from 'src/state/Clusters'
import type { Cluster } from 'src/state/Clusters'
import { fetchPerCountryDataRaw } from 'src/io/getPerCountryData'
import { atomFamilyAsync } from 'src/state/utils/atomAsync'

export const clustersForPerCountryDataAtom = atomFamilyAsync<Cluster[], string>({
  key: 'clustersForPerCountryDataAtom',
  async default(region: string) {
    const { regions } = await fetchPerCountryDataRaw()
    const perCountryData = regions.find((candidate) => candidate.region === region)
    if (!perCountryData) {
      throw new Error(`Per-country data not found for region: '${region}'`)
    }
    const clusterNames = copy(perCountryData.cluster_names).sort()
    const clusters = clusterNames.map((cluster) => ({ cluster, enabled: true }))

    const { query } = parseUrl(Router.asPath)
    const enabledClusters = convertToArrayMaybe(get(query, 'variant'))
    if (enabledClusters) {
      return clusters.map((cluster) => ({
        ...cluster,
        enabled: includesCaseInsensitive(enabledClusters, cluster.cluster),
      }))
    }

    return clusters
  },
  effects: [updateUrlOnClustersSet],
})
