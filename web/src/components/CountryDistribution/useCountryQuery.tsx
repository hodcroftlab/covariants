import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { Region, ClusterState, getPerCountryData, CountryDistribution } from 'src/io/getPerCountryData'
import { Places } from 'src/io/getPlaces'

import { getRegionBySelectedCountries, getCurriedClustersBySelectedClusters } from './utils'

export type ParsedUrlQuery = string | string[] | undefined

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

export const useCountryAndClusterQuery = (): {
  rawQueries: {
    selectedCountries: ParsedUrlQuery
    selectedClusters: ParsedUrlQuery
  }
  state: {
    region: Region
    setRegion: React.Dispatch<React.SetStateAction<Region>>
    places: Places
    setPlaces: React.Dispatch<React.SetStateAction<Places>>
    countryDistributions: CountryDistribution[]
    currentClusters: ClusterState
    setClusters: React.Dispatch<React.SetStateAction<ClusterState>>
  }
} => {
  const router = useRouter()

  const { countries: selectedCountries, variants: selectedClusters } = router.query

  const [currentRegion, setCurrentRegion] = useState(getRegionBySelectedCountries(selectedCountries))

  const {
    allPossibleClusters,
    getClustersBySelectedClusters,
    places: initialPlaces,
    countryDistributions,
  } = useMemo(() => {
    const { clusters: allPossibleClusters, places, countryDistributions } = getPerCountryData(currentRegion)
    const getClustersBySelectedClusters = getCurriedClustersBySelectedClusters(allPossibleClusters)
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
    setCurrentRegion(getRegionBySelectedCountries(selectedCountries))
  }, [selectedCountries, setCurrentRegion])

  return {
    rawQueries: {
      selectedCountries,
      selectedClusters,
    },
    state: {
      region: currentRegion,
      setRegion: setCurrentRegion,
      places,
      setPlaces,
      countryDistributions,
      currentClusters,
      setClusters,
    },
  }
}
