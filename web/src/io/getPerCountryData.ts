/* eslint-disable camelcase */
import copy from 'fast-copy'
import { pickBy } from 'lodash'
import { SetterOrUpdater, useRecoilState } from 'recoil'
import type { Cluster } from 'src/state/Clusters'
import type { Country } from 'src/state/Places'
import { FETCHER, useAxiosQuery, UseAxiosQueryOptions } from 'src/hooks/useAxiosQuery'
import { clustersForPerCountryDataAtom } from 'src/state/ClustersForPerCountryData'

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

export interface PerCountryData {
  clusterNames: string[]
  clusters: Cluster[]
  countryDistributions: CountryDistribution[]
  perCountryIntroContent: string
}

export function usePerCountryDataRaw(options?: UseAxiosQueryOptions<PerCountryDataRaw>) {
  return useAxiosQuery<PerCountryDataRaw>(
    // 'https://raw.githubusercontent.com/hodcroftlab/covariants/master/web/data/perCountryData.json',
    'http://localhost:4001/perCountryData.json',
    options,
  )
}

export function fetchPerCountryDataRaw() {
  return FETCHER.fetch<PerCountryDataRaw>('http://localhost:4001/perCountryData.json')
}

export function usePerCountryData(region: string): PerCountryData & { setClusters: SetterOrUpdater<Cluster[]> } {
  const allData = usePerCountryDataRaw()
  const perCountryData: PerCountryDatum | undefined = allData.regions.find((candidate) => candidate.region === region)
  if (!perCountryData) {
    throw new Error(`Per-country data not found for region: ${region}`)
  }
  const [clusters, setClusters] = useRecoilState(clustersForPerCountryDataAtom(region))
  const clusterNames = copy(perCountryData.cluster_names).sort()
  const countryDistributions = perCountryData.distributions
  const perCountryIntroContent = perCountryData.per_country_intro_content

  return {
    clusterNames,
    clusters,
    setClusters,
    countryDistributions,
    perCountryIntroContent,
  }
}

export function usePerCountryIntroContentFilename(region: string): string {
  const allData = usePerCountryDataRaw()
  const perCountryData: PerCountryDatum | undefined = allData.regions.find((candidate) => candidate.region === region)
  if (!perCountryData) {
    throw new Error(`Region data not found for region: ${region}`)
  }
  return perCountryData.per_country_intro_content
}

export function useRegions() {
  const allData = usePerCountryDataRaw()
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
