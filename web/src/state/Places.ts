import { z } from 'zod'
import { FETCHER } from 'src/hooks/useAxiosQuery'
import { atomAsync } from 'src/state/utils/atomAsync'

export const REGIONS = {
  WORLD: 'World' as const,
  UNITED_STATES: 'United States' as const,
  SWITZERLAND: 'Switzerland' as const,
}
export const DEFAULT_REGION = REGIONS.WORLD

export interface Country {
  country: string
  enabled: boolean

  [key: string]: string | boolean
}

export interface Continent {
  continent: string
  enabled: boolean

  [key: string]: string | boolean
}

const regionCountrySchema = z.record(z.string(), z.string().array())
export type RegionCountry = z.infer<typeof regionCountrySchema>

export function fetchRegionCountry() {
  return FETCHER.validatedFetch('/data/region_country.json', regionCountrySchema)
}

export const regionCountryAtom = atomAsync<RegionCountry>({
  key: 'regionCountryAtom',
  async default() {
    return await fetchRegionCountry()
  },
})

export const getAllContinents = (region?: string, regionCountry?: RegionCountry) => {
  if (region === REGIONS.WORLD && regionCountry !== undefined) {
    return Object.keys(regionCountry).map((continent) => ({ continent, enabled: true }))
  }
  return [{ continent: region ?? '', enabled: true }]
}

export const getCountryToContinentMap = (regionCountry: RegionCountry) => {
  return Object.entries(regionCountry).reduce((result, [continent, countries]) => {
    // eslint-disable-next-line no-loops/no-loops
    for (const country of countries) {
      result.set(country, continent)
    }
    return result
  }, new Map<string, string>())
}

/**
 * Toggles `enable` field of each country, according to whether the corresponding continent is enabled
 */
export const toggleCountriesFromContinents = (
  countries: Country[],
  continents: Continent[],
  regionCountry: RegionCountry,
) => {
  return countries.map((country) => {
    const continentMap = getCountryToContinentMap(regionCountry)
    const continent = continentMap.get(country.country)
    const continentFound = continents.find((continentCandidate) => continentCandidate.continent === continent)
    const enabled = continentFound?.enabled ?? false
    return { ...country, enabled }
  })
}

/**
 * Deduces which continents are enabled, depending on which countries are enabled
 */
export const getContinentsFromCountries = (countries: Country[], region?: string, regionCountry?: RegionCountry) => {
  // Continents are only relevant for the 'World' region
  if (region === REGIONS.WORLD && regionCountry !== undefined) {
    return Object.entries(regionCountry).map(([continent, continentCountries]) => {
      // A continent is enabled if every country of this continent is enabled
      const enabled = continentCountries.every((continentCountry) => {
        const countryFound = countries.find((country) => country.country === continentCountry)
        return countryFound?.enabled ?? true
      })
      return { continent, enabled }
    })
  }

  // For other regions, there is only one fake continent, and it's enabled if all countries are enabled
  const enabled = countries.every((country) => country.enabled)
  return [{ continent: region ?? DEFAULT_REGION, enabled }]
}

/** Toggles a given country enabled/disabled */
export function toggleCountry(countries: Country[], countryName: string): Country[] {
  return countries.map((country) => {
    if (country.country === countryName) {
      return { ...country, enabled: !country.enabled }
    }
    return country
  })
}

/** Toggles a given continent enabled/disabled */
export function toggleContinent(continents: Continent[], continentName: string): Continent[] {
  return continents.map((continent) => {
    if (continent.continent === continentName) {
      return { ...continent, enabled: !continent.enabled }
    }
    return continent
  })
}

/** Toggles all countries enabled */
export function enableAllCountries(countries: Country[]): Country[] {
  return countries.map((country) => ({ ...country, enabled: true }))
}

/** Toggles all countries disabled */
export function disableAllCountries(countries: Country[]): Country[] {
  return countries.map((country) => ({ ...country, enabled: false }))
}
