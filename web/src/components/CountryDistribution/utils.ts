import { Region, ClusterState } from 'src/io/getPerCountryData'

export const getRegionBySelectedCountries = (countries: string | string[] | undefined): Region => {
  if (Array.isArray(countries)) {
    if (
      countries.length === 1 &&
      [Region.UNITED_STATES.toLowerCase(), 'usa', 'us'].includes(countries[0].toLowerCase())
    ) {
      return Region.UNITED_STATES
    }
    if (countries.length === 1 && countries[0].toLowerCase() === Region.SWITZERLAND.toLowerCase()) {
      return Region.SWITZERLAND
    }
    return Region.WORLD
  }
  if (countries) {
    switch (countries.toLowerCase()) {
      case Region.UNITED_STATES.toLowerCase():
      case 'usa':
      case 'us':
        return Region.UNITED_STATES
      case Region.SWITZERLAND.toLowerCase():
        return Region.SWITZERLAND
      default:
        return Region.WORLD
    }
  }
  return Region.WORLD
}

export const getCurriedClustersBySelectedClusters = (fallbackClusters: ClusterState) => {
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
    let selectedClusters = new Set<string>()
    if (typeof clusters === 'string') {
      selectedClusters.add(clusters)
    } else if (Array.isArray(clusters)) {
      selectedClusters = new Set(clusters)
    }
    return clusterKeys.reduce((acc, key) => {
      return { ...acc, [key]: { enabled: selectedClusters.has(key) } }
    }, {})
  }
}
