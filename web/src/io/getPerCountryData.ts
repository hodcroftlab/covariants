/* eslint-disable camelcase */
import { pickBy } from 'lodash'
import type { Cluster } from 'src/state/Clusters'
import type { Country } from 'src/state/Places'
import { FETCHER } from 'src/hooks/useAxiosQuery'

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
  cluster_counts: Record<string, number | undefined>
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

export function fetchPerCountryDataRaw() {
  return FETCHER.fetch<PerCountryDataRaw>('/data/perCountryData.json')
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
