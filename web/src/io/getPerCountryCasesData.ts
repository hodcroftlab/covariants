/* eslint-disable camelcase */
import copy from 'fast-copy'
import { pickBy } from 'lodash'

import { z } from 'zod'
import { useMemo } from 'react'
import type { Cluster } from 'src/state/Clusters'
import type { Country } from 'src/state/Places'
import { sortClusters } from 'src/io/getClusters'
import { FETCHER, useValidatedAxiosQuery } from 'src/hooks/useAxiosQuery'

export interface PerCountryCasesData {
  clusterNames: string[]
  clusters: Cluster[]
  countries: Country[]
  perCountryCasesDistributions: PerCountryCasesDistribution[]
  perCountryCasesIntroContent: string
}

const perCountryCasesDistributionDatum = z.object({
  week: z.string(),
  stand_total_cases: z.number(),
  stand_estimated_cases: z.record(z.string(), z.number().optional()),
})

const perCountryCasesDistribution = z.object({
  country: z.string(),
  distribution: perCountryCasesDistributionDatum.array(),
})

const perCountryCasesDatum = z.object({
  cluster_names: z.string().array(),
  distributions: perCountryCasesDistribution.array(),
  max_date: z.string(),
  min_date: z.string(),
  region: z.string(),
  per_country_intro_content: z.string(),
})

const perCountryCaseDataRaw = z.object({
  regions: perCountryCasesDatum.array(),
})

type PerCountryCasesDataRaw = z.infer<typeof perCountryCaseDataRaw>
type PerCountryCasesDatum = z.infer<typeof perCountryCasesDatum>
export type PerCountryCasesDistribution = z.infer<typeof perCountryCasesDistribution>
export type PerCountryCasesDistributionDatum = z.infer<typeof perCountryCasesDistributionDatum>

export function fetchPerCountryCasesDataRaw(): Promise<PerCountryCasesDataRaw> {
  return FETCHER.fetch<PerCountryCasesDataRaw>('/data/perCountryDataCaseCounts.json')
}

export function usePerCountryCasesDataRaw(): PerCountryCasesDataRaw {
  const { data: regions } = useValidatedAxiosQuery<PerCountryCasesDataRaw>(
    '/data/perCountryDataCaseCounts.json',
    perCountryCaseDataRaw,
  )
  return regions
}

export async function fetchPerCountryCasesData(): Promise<PerCountryCasesData> {
  const allData = await fetchPerCountryCasesDataRaw()

  return mapPerCountryCasesData(allData)
}

export function usePerCountryCasesData(): PerCountryCasesData {
  const allData = usePerCountryCasesDataRaw()

  return useMemo(() => mapPerCountryCasesData(allData), [allData])
}

function mapPerCountryCasesData(allData: PerCountryCasesDataRaw): PerCountryCasesData {
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
