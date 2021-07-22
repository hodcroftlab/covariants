/* eslint-disable camelcase */
import copy from 'fast-copy'

import type { CountryDistribution } from 'src/components/CountryDistribution/CountryDistributionPage'

import allData from 'src/../data/perCountryData.json'
import allDataGeneva from 'src/../data/perCountryDataGeneva.json'

export const REGIONS = allData.regions.map(({ region }) => region)
export const REGIONS_HAVE_DATA = allData.regions.map(
  ({ cluster_names, distributions }) => cluster_names.length > 0 && distributions.length > 0,
)
export const DEFAULT_REGION = REGIONS[0]

export interface CountryDataRaw {
  cluster_names: string[]
  distributions: CountryDistribution[]
  max_date: string
  min_date: string
  region: string
  per_country_intro_content: string
}

export function getPerCountryIntroContentFilename(region: string): string {
  const perCountryData: CountryDataRaw | undefined = allData.regions.find(
    (candidate) => candidate.region === region,
  ) as CountryDataRaw | undefined
  if (!perCountryData) {
    throw new Error(`Region data not found for region: ${region}`)
  }

  return perCountryData.per_country_intro_content
}

export function getClusterData(region: string) {
  const perCountryData: CountryDataRaw | undefined = allData.regions.find(
    (candidate) => candidate.region === region,
  ) as CountryDataRaw | undefined
  if (!perCountryData) {
    throw new Error(`Region data not found for region: ${region}`)
  }

  const clusters = copy(perCountryData.cluster_names).sort()
  const clustersState = clusters.reduce((result, cluster) => {
    return { ...result, [cluster]: { enabled: true } }
  }, {})

  const countries = perCountryData.distributions.map(({ country }) => country).sort()
  const countriesState = countries.reduce((result, country) => {
    return { ...result, [country]: { enabled: true } }
  }, {})

  const countryDistributions = perCountryData.distributions

  const perCountryIntroContent = perCountryData.per_country_intro_content

  return {
    clusters,
    clustersState,
    countries,
    countriesState,
    countryDistributions,
    perCountryIntroContent,
  }
}

export function getGenevaClusterData() {
  const region = 'Geneva'
  const perCountryDataGeneva: CountryDataRaw | undefined = allDataGeneva.regions.find(
    (candidate) => candidate.region === region,
  ) as CountryDataRaw | undefined
  if (!perCountryDataGeneva) {
    throw new Error(`Region data not found for region: ${region}`)
  }

  const clusters = copy(perCountryDataGeneva.cluster_names).sort()
  const clustersState = clusters.reduce((result, cluster) => {
    return { ...result, [cluster]: { enabled: true } }
  }, {})

  const countries = perCountryDataGeneva.distributions.map(({ country }) => country).sort()
  const countriesState = countries.reduce((result, country) => {
    return { ...result, [country]: { enabled: true } }
  }, {})

  const countryDistributions = perCountryDataGeneva.distributions

  const perCountryIntroContent = perCountryDataGeneva.per_country_intro_content

  return {
    clusters,
    clustersState,
    countries,
    countriesState,
    countryDistributions,
    perCountryIntroContent,
  }
}
