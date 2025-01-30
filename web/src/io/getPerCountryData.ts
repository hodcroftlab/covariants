/* eslint-disable camelcase */
import { pickBy } from 'lodash'
import { z } from 'zod'
import type { Cluster } from 'src/state/Clusters'
import type { Country } from 'src/state/Places'
import { FETCHER } from 'src/hooks/useAxiosQuery'

export interface CountryDistribution {
  country: string
  distribution: CountryDistributionDatum[]
}

const countryDistributionDatumSchema = z.object({
  week: z.string(),
  total_sequences: z.number(),
  cluster_counts: z.record(z.string(), z.number().optional()),
})

const countryDistributionSchema = z.object({
  country: z.string(),
  distribution: countryDistributionDatumSchema.array(),
})

const perCountryDatumSchema = z.object({
  cluster_names: z.string().array(),
  distributions: countryDistributionSchema.array(),
  max_date: z.string(),
  min_date: z.string(),
  region: z.string(),
  per_country_intro_content: z.string(),
})

const perCountryDataRawSchema = z.object({
  regions: perCountryDatumSchema.array(),
})

export type PerCountryDataRaw = z.infer<typeof perCountryDataRawSchema>
export type CountryDistributionDatum = z.infer<typeof countryDistributionDatumSchema>

export async function fetchPerCountryDataRaw(): Promise<PerCountryDataRaw> {
  return await FETCHER.validatedFetch('/data/perCountryData.json', perCountryDataRawSchema)
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
