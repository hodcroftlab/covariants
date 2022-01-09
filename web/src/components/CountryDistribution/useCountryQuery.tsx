import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { Region, ClusterState, getPerCountryData, CountryDistribution } from 'src/io/getPerCountryData'
import { Places } from 'src/io/getPlaces'

import { getRegionBySelectedRegionQs, getCurriedClustersStateBySelectedClusters, ParsedUrlQuery } from './utils'


export const convertUrlQueryToSelection = (queryString: ParsedUrlQuery): string[] => {
  if (!queryString) {
    return []
  }
  if (typeof queryString === 'string') {
    return [queryString]
  }
  if (Array.isArray(queryString)) {
    return queryString
  }
  return []
}

/**
 * A react hook that take in router query params as source of truth
 * and compute the React component states for UI display
 */
export const useRouterQuery = (): {
  rawQueries: {
    selectedRegion: ParsedUrlQuery
    selectedClusters: ParsedUrlQuery
  }
  state: {
    region: Region
    places: Places
    setPlaces: React.Dispatch<React.SetStateAction<Places>>
    countryDistributions: CountryDistribution[]
    currentClusters: ClusterState
    setClusters: React.Dispatch<React.SetStateAction<ClusterState>>
  }
} => {
  const router = useRouter()

  const { region: selectedRegion, variants: selectedClusters } = router.query

  const [currentRegion, setCurrentRegion] = useState<Region>(getRegionBySelectedRegionQs(selectedRegion))

  const {
    allPossibleClusters,
    getClustersBySelectedClusters,
    places: initialPlaces,
    countryDistributions,
  } = useMemo(() => {
    const { clusters: allPossibleClusters, places, countryDistributions } = getPerCountryData(currentRegion)
    const getClustersBySelectedClusters = getCurriedClustersStateBySelectedClusters(allPossibleClusters)
    return {
      places,
      allPossibleClusters,
      countryDistributions,
      getClustersBySelectedClusters,
    }
  }, [currentRegion])

  const [places, setPlaces] = useState<Places>(initialPlaces)
  const [currentClusters, setClusters] = useState<ClusterState>(getClustersBySelectedClusters(selectedClusters))

  useEffect(() => {
    setPlaces(initialPlaces)
  }, [initialPlaces, setPlaces])

  useEffect(() => {
    setClusters(getClustersBySelectedClusters(selectedClusters))
  }, [selectedClusters, getClustersBySelectedClusters, allPossibleClusters])

  useEffect(() => {
    setClusters(getClustersBySelectedClusters(selectedClusters))
  }, [selectedClusters, setClusters, getClustersBySelectedClusters])

  useEffect(() => {
    setCurrentRegion(getRegionBySelectedRegionQs(selectedRegion))
  }, [selectedRegion, setCurrentRegion])

  return {
    rawQueries: {
      selectedRegion,
      selectedClusters,
    },
    state: {
      region: currentRegion,
      places,
      setPlaces,
      countryDistributions,
      currentClusters,
      setClusters,
    },
  }
}
