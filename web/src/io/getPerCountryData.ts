/* eslint-disable camelcase */
import copy from 'fast-copy'
import { pickBy } from 'lodash'

import type { Cluster } from 'src/state/Clusters'
import type { Country } from 'src/state/Places'

import perCountryDataJson from 'src/../data/perCountryData.json'

export interface PerCountryDatum {
  cluster_names: string[]
  distributions: CountryDistribution[]
  max_date: string
  min_date: string
  region: string
  per_country_intro_content: string
}

export interface PerCountryDataRaw {
  regions: PerCountryDatum[]
}

export interface CountryDistributionDatum {
  week: string
  total_sequences: number
  cluster_counts: {
    [key: string]: number | undefined
  }
}

export interface CountryDistribution {
  country: string
  distribution: CountryDistributionDatum[]
}

export interface ClusterState {
  [key: string]: { enabled: boolean }
}

export interface PerCountryData {
  clusterNames: string[]
  clusters: Cluster[]
  countryDistributions: CountryDistribution[]
  perCountryIntroContent: string
}

export function getPerCountryDataRaw(): PerCountryDataRaw {
  return perCountryDataJson as PerCountryDataRaw
}

export function getPerCountryData(regionName: string): PerCountryData {
  const allData = getPerCountryDataRaw()

  const perCountryData: PerCountryDatum | undefined = allData.regions.find(
    (candidate) => candidate.region === regionName,
  )
  if (!perCountryData) {
    throw new Error(`Region data not found for region: ${regionName}`)
  }

  const clusterNames = copy(perCountryData.cluster_names).sort()
  const clusters = clusterNames.map((cluster) => ({ cluster, enabled: true }))

  const countryDistributions = perCountryData.distributions

  const perCountryIntroContent = perCountryData.per_country_intro_content

  return {
    clusterNames,
    clusters,
    countryDistributions,
    perCountryIntroContent,
  }
}

export function getPerCountryIntroContentFilename(region: string): string {
  const allData = getPerCountryDataRaw()
  const perCountryData: PerCountryDatum | undefined = allData.regions.find((candidate) => candidate.region === region)
  if (!perCountryData) {
    throw new Error(`Region data not found for region: ${region}`)
  }
  return perCountryData.per_country_intro_content
}

export function getRegions() {
  const allData = getPerCountryDataRaw()
  const regionNames = allData.regions.map(({ region }) => region)
  const regionsHaveData = allData.regions.map(
    ({ cluster_names, distributions }) => cluster_names.length > 0 && distributions.length > 0,
  )
  const defaultRegionName = regionNames[0]

  return {
    regionNames,
    regionsHaveData,
    defaultRegionName,
  }
}

export function filterCountries(countries: Country[], countryDistributions: CountryDistribution[]) {
  const enabledCountries = new Set<string>(
    countries.filter((country) => country.enabled).map((country) => country.country),
  )
  const withCountriesFiltered = countryDistributions.filter(({ country }) => {
    return enabledCountries.has(country)
  })
  return { enabledCountries, withCountriesFiltered }
}

export function filterClusters(clusters: Cluster[], withCountriesFiltered: CountryDistribution[]) {
  const enabledClusters = clusters.filter(({ enabled }) => enabled).map(({ cluster }) => cluster)

  const withClustersFiltered = withCountriesFiltered.map(({ country, distribution }) => {
    const distributionFiltered = distribution.map((dist) => {
      const countsFiltered = pickBy(dist.cluster_counts, (_0, cluster) => {
        return enabledClusters.includes(cluster)
      })

      return { ...dist, cluster_counts: countsFiltered }
    })
    return { country, distribution: distributionFiltered }
  })

  return { enabledClusters, withClustersFiltered }
}
