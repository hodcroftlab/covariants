/* eslint-disable camelcase */
import { pickBy } from 'lodash'
import { z } from 'zod'
import { FETCHER } from 'src/hooks/useAxiosQuery'
import type { Country } from 'src/state/Places'
import type { Cluster } from 'src/state/Clusters'

const clusterDistributionDatumSchema = z.object({
  week: z.string(),
  frequencies: z.record(z.string(), z.number().optional()),
  interp: z.record(z.string(), z.boolean().optional()),
  orig: z.record(z.string(), z.boolean().optional()),
})

const clusterDistributionSchema = z.object({
  cluster: z.string(),
  distribution: clusterDistributionDatumSchema.array(),
})

const perClusterDataRawSchema = z.object({
  country_names: z.string().array(),
  distributions: clusterDistributionSchema.array(),
})

export type PerClusterDataRaw = z.infer<typeof perClusterDataRawSchema>
export type ClusterDistribution = z.infer<typeof clusterDistributionSchema>
export type ClusterDistributionDatum = z.infer<typeof clusterDistributionDatumSchema>

export async function fetchPerClusterDataRaw() {
  return await FETCHER.validatedFetch('/data/perClusterData.json', perClusterDataRawSchema)
}

export function filterCountries(countries: Country[], withClustersFiltered: ClusterDistribution[]) {
  const enabledCountries = new Set<string>(
    countries.filter((country) => country.enabled).map((country) => country.country),
  )

  const withCountriesFiltered = withClustersFiltered.map(({ cluster, distribution }) => {
    const distributionFiltered = distribution.map((dist) => {
      const frequenciesFiltered = pickBy(dist.frequencies, (_0, country) => {
        return enabledCountries.has(country)
      })

      return { ...dist, frequencies: frequenciesFiltered }
    })
    return { cluster, distribution: distributionFiltered }
  })

  return { enabledCountries: Array.from(enabledCountries), withCountriesFiltered }
}

export function filterClusters(clusters: Cluster[], clusterDistributions: ClusterDistribution[]) {
  const enabledClusters = clusters.filter(({ enabled }) => enabled).map(({ cluster }) => cluster)
  const withClustersFiltered = clusterDistributions.filter(({ cluster }) => {
    return enabledClusters.includes(cluster)
  })
  return { enabledClusters, withClustersFiltered }
}
