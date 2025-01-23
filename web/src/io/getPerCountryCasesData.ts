/* eslint-disable camelcase */
import copy from 'fast-copy'
import { pickBy } from 'lodash'

import { z } from 'zod'
import type { Cluster } from 'src/state/Clusters'
import type { Country } from 'src/state/Places'
import { sortClustersByClusterNames } from 'src/io/getClusters'
import { FETCHER } from 'src/hooks/useAxiosQuery'

export interface PerCountryCasesData {
  clusterNames: string[]
  clusters: Cluster[]
  countries: Country[]
  perCountryCasesDistributions: PerCountryCasesDistribution[]
  perCountryCasesIntroContent: string
}

const perCountryCasesDistributionDatumSchema = z.object({
  week: z.string(),
  stand_total_cases: z.number(),
  stand_estimated_cases: z.record(z.string(), z.number().optional()),
})

const perCountryCasesDistributionSchema = z.object({
  country: z.string(),
  distribution: perCountryCasesDistributionDatumSchema.array(),
})

const perCountryCasesDatumSchema = z.object({
  cluster_names: z.string().array(),
  distributions: perCountryCasesDistributionSchema.array(),
  max_date: z.string(),
  min_date: z.string(),
  region: z.string(),
  per_country_intro_content: z.string(),
})

const perCountryCaseDataRawSchema = z.object({
  regions: perCountryCasesDatumSchema.array(),
})

export type PerCountryCasesDataRaw = z.infer<typeof perCountryCaseDataRawSchema>
type PerCountryCasesDatum = z.infer<typeof perCountryCasesDatumSchema>
export type PerCountryCasesDistribution = z.infer<typeof perCountryCasesDistributionSchema>
export type PerCountryCasesDistributionDatum = z.infer<typeof perCountryCasesDistributionDatumSchema>

export async function fetchPerCountryCasesDataRaw(): Promise<PerCountryCasesDataRaw> {
  const data = await FETCHER.fetch<PerCountryCasesDataRaw>('/data/perCountryDataCaseCounts.json')
  return perCountryCaseDataRawSchema.parse(data)
}

export function mapPerCountryCasesData(
  allData: PerCountryCasesDataRaw,
  allClusterNames: string[],
): PerCountryCasesData {
  const regionName = 'World'

  const perCountryCasesData: PerCountryCasesDatum | undefined = allData.regions.find(
    (candidate) => candidate.region === regionName,
  )
  if (!perCountryCasesData) {
    throw new Error(`Region data not found for region: ${regionName}`)
  }

  const clusterNames = copy(perCountryCasesData.cluster_names).sort()
  const unsortedClusters = clusterNames.map((cluster) => ({ cluster, enabled: true }))
  const clusters = sortClustersByClusterNames(unsortedClusters, allClusterNames)

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
