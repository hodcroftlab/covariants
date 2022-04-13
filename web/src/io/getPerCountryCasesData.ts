/* eslint-disable camelcase */
import copy from 'fast-copy'
import { pickBy } from 'lodash'

import type { Cluster } from 'src/state/Clusters'
import type { Country } from 'src/state/Places'
import { sortClusters } from 'src/io/getClusters'

import perCountryCasesDataJson from 'src/../data/perCountryDataCaseCounts.json'

export interface PerCountryCasesDatum {
  cluster_names: string[]
  distributions: PerCountryCasesDistribution[]
  max_date: string
  min_date: string
  region: string
  per_country_intro_content: string
}

export interface PerCountryCasesDataRaw {
  regions: PerCountryCasesDatum[]
}

export interface PerCountryCasesDistributionDatum {
  week: string
  stand_total_cases: number
  stand_estimated_cases: {
    [key: string]: number | undefined
  }
}

export interface PerCountryCasesDistribution {
  country: string
  distribution: PerCountryCasesDistributionDatum[]
}

export interface ClusterState {
  [key: string]: { enabled: boolean }
}

export interface PerCountryCasesData {
  clusterNames: string[]
  clusters: Cluster[]
  countries: Country[]
  perCountryCasesDistributions: PerCountryCasesDistribution[]
  perCountryCasesIntroContent: string
}

export function getPerCountryCasesDataRaw(): PerCountryCasesDataRaw {
  return perCountryCasesDataJson as PerCountryCasesDataRaw
}

export function getPerCountryCasesData(): PerCountryCasesData {
  const allData = getPerCountryCasesDataRaw()

  const regionName = 'World'

  const perCountryCasesData: PerCountryCasesDatum | undefined = allData.regions.find(
    (candidate) => candidate.region === regionName,
  )
  if (!perCountryCasesData) {
    throw new Error(`Region data not found for region: ${regionName}`)
  }

  const clusterNames = copy(perCountryCasesData.cluster_names).sort()
  const clusters = sortClusters(clusterNames.map((cluster) => ({ cluster, enabled: true })))

  const perCountryCasesDistributions = perCountryCasesData.distributions

  const countries: Country[] = perCountryCasesData.distributions.map((distr) => ({
    country: distr.country,
    enabled: true,
  }))

  const perCountryCasesIntroContent = perCountryCasesData.per_country_intro_content

  return {
    clusterNames,
    clusters,
    countries,
    perCountryCasesDistributions,
    perCountryCasesIntroContent,
  }
}

export function getPerCountryCasesIntroContentFilename(region: string): string {
  const allData = getPerCountryCasesDataRaw()
  const perCountryCasesData: PerCountryCasesDatum | undefined = allData.regions.find(
    (candidate) => candidate.region === region,
  )
  if (!perCountryCasesData) {
    throw new Error(`Region data not found for region: ${region}`)
  }
  return perCountryCasesData.per_country_intro_content
}

export function getRegions() {
  const allData = getPerCountryCasesDataRaw()
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

export function filterCountries(countries: Country[], perCountryCasesDistributions: PerCountryCasesDistribution[]) {
  const enabledCountries = new Set<string>(
    countries.filter((country) => country.enabled).map((country) => country.country),
  )
  const withCountriesFiltered = perCountryCasesDistributions.filter(({ country }) => {
    return enabledCountries.has(country)
  })
  return { enabledCountries, withCountriesFiltered }
}

export function filterClusters(clusters: Cluster[], withCountriesFiltered: PerCountryCasesDistribution[]) {
  const enabledClusters = clusters.filter(({ enabled }) => enabled).map(({ cluster }) => cluster)

  const withClustersFiltered = withCountriesFiltered.map(({ country, distribution }) => {
    const distributionFiltered = distribution.map((dist) => {
      const countsFiltered = pickBy(dist.stand_estimated_cases, (_0, cluster) => {
        return enabledClusters.includes(cluster)
      })

      return { ...dist, cluster_counts: countsFiltered }
    })
    return { country, distribution: distributionFiltered }
  })

  return { enabledClusters, withClustersFiltered }
}
