import { NextRouter } from 'next/router'

import { Region, ClusterState } from 'src/io/getPerCountryData'

export type ParsedUrlQuery = string | string[] | undefined

/**
 * An enum of possible `region`, as expressed as query strings
 */
export enum RegionQueryString {
  World = 'world',
  UnitedStates = 'usa',
  Switzerland = 'switzerland',
}

/**
 * map the extracted router query string to the currently selected region
 */
export const getRegionBySelectedRegionQs = (regionQs: ParsedUrlQuery): Region => {
  if (Array.isArray(regionQs)) {
    if (regionQs.length === 1 && regionQs[0].toLowerCase() === RegionQueryString.UnitedStates) {
      return Region.UnitedStates
    }
    if (regionQs.length === 1 && regionQs[0].toLowerCase() === RegionQueryString.Switzerland) {
      return Region.Switzerland
    }
    return Region.World
  }
  if (regionQs) {
    switch (regionQs.toLowerCase()) {
      case RegionQueryString.UnitedStates.toLowerCase():
        return Region.UnitedStates
      case RegionQueryString.Switzerland.toLowerCase():
        return Region.Switzerland
      default:
        return Region.World
    }
  }
  return Region.World
}

/**
 * A curried function that take in a fallback cluster state, return a callback function that
 * take in the selected clusters, and return the `ClusterState`
 */
export const getCurriedClustersStateBySelectedClusters = (fallbackClusters: ClusterState) => {
  const clusterKeys = Object.keys(fallbackClusters)
  const noClusterSelectedState = clusterKeys.reduce((acc, key) => {
    return { ...acc, [key]: { enabled: false } }
  }, {})
  return (clusters: string | string[] | undefined, deselectAll = false): ClusterState => {
    if (!clusters) {
      if (!deselectAll) {
        return fallbackClusters
      }
      return noClusterSelectedState
    }
    const selectedClusters = new Set<string>(Array.isArray(clusters) ? clusters : [clusters])
    return clusterKeys.reduce((acc, key) => {
      return { ...acc, [key]: { enabled: selectedClusters.has(key) } }
    }, {})
  }
}

/**
 * parse the current query string from Next Router and give the selected region/variants
 */
export const getCurrentQs = (router: NextRouter): Partial<Record<'region' | 'variants', string[] | string>> => {
  const result: Partial<Record<'region' | 'variants', string[] | string>> = {}
  if (router.query && router.query.region) {
    result.region = router.query.region
  }
  if (router.query && router.query.variants) {
    result.variants = router.query.variants
  }
  return result
}
