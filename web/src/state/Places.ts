import copy from 'fast-copy'
import { ParsedUrlQuery } from 'querystring'
import { atom, atomFamily, DefaultValue, selectorFamily } from 'recoil'
import { get } from 'lodash'

import { convertToArrayMaybe, includesCaseInsensitive } from 'src/helpers/array'
import { takeFirstMaybe } from 'src/helpers/takeFirstMaybe'
import { updateUrlQuery } from 'src/helpers/urlQuery'
import { shouldPlotCountry } from 'src/io/getCountryColor'

import { getPerClusterDataRaw } from 'src/io/getPerClusterData'
import { getPerCountryDataRaw } from 'src/io/getPerCountryData'
import regionCountryJson from 'src/../data/region_country.json'

export const DEFAULT_REGION = 'World'

export interface Country {
  country: string
  enabled: boolean
}

export interface Continent {
  continent: string
  enabled: boolean
}

/**
 * Converts values incoming from URL query into region, countries and continents.
 * To be used during app startup.
 */
export function urlQueryToPlaces(query: ParsedUrlQuery) {
  const regionRaw = takeFirstMaybe(get(query, 'region'))

  const region =
    getAllRegions().find((candidate) => candidate.toLowerCase() === regionRaw?.toLowerCase()) ?? DEFAULT_REGION

  const enabledCountries = convertToArrayMaybe(get(query, 'country'))

  // Take all countries and set only the countries present in the query as `enabled`
  let countries = getAllCountries(region)
  if (enabledCountries) {
    countries = countries.map((country) => ({
      ...country,
      enabled: includesCaseInsensitive(enabledCountries, country.country),
    }))
  }

  // Enable/disable continents depending on which countries are enabled
  const continents = getContinentsFromCountries(region, countries)

  return { region, continents, countries }
}

export function getAllRegions() {
  const perCountryData = getPerCountryDataRaw()
  return perCountryData.regions.map((region) => region.region)
}

export function getAllCountries(region?: string): Country[] {
  // Regions are only relevant for the country distribution (/per-country) page and the data is different for them
  if (region) {
    const perCountryData = getPerCountryDataRaw()
    const data = perCountryData.regions.find((dataRegion) => dataRegion.region === region)
    if (!data) {
      throw new RangeError(`Country data not found for region ${region}`)
    }
    return data.distributions.map(({ country }) => ({ country, enabled: true }))
  }

  // If there's no region, then it's the cluster distribution (/per-variant) page
  const perClusterData = getPerClusterDataRaw()
  const countryNames: string[] = copy(perClusterData.country_names).sort()
  return countryNames.map((country) => ({ country, enabled: shouldPlotCountry(country) }))
}

export function getAllContinents(region?: string): Continent[] {
  if (region === 'World') {
    return Object.keys(regionCountryJson).map((continent) => ({ continent, enabled: true }))
  }
  return [{ continent: region ?? '', enabled: true }]
}

export function getCountryToContinentMap(): Map<string, string> {
  return Object.entries(regionCountryJson).reduce((result, [continent, countries]) => {
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
export function toggleCountriesFromContinents(
  region: string | undefined,
  countries: Country[],
  continents: Continent[],
): Country[] {
  return countries.map((country) => {
    const continentMap = getCountryToContinentMap()
    const continent = continentMap.get(country.country)
    const continentFound = continents.find((continentCandidate) => continentCandidate.continent === continent)
    const enabled = continentFound?.enabled ?? false
    return { ...country, enabled }
  })
}

/**
 * Deduces which continents are enabled, depending on which countries are enabled
 */
export function getContinentsFromCountries(region: string | undefined, countries: Country[]): Continent[] {
  // Continents are only relevant for the 'World' region
  if (region === 'World') {
    return Object.entries(regionCountryJson).map(([continent, continentCountries]) => {
      // A continent is enabled if every country of this continent is enabled
      const enabled = continentCountries.every((continentCountry) => {
        const countryFound = countries.find((country) => country.country === continentCountry)
        return countryFound?.enabled ?? true
      })
      return { continent, enabled }
    })
  }

  // For other regions, there is only one fake continent and it's enabled if all countries are enabled
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

/**
 * Represents current region
 */
export const regionAtom = atom<string>({
  key: 'region',
  default: DEFAULT_REGION,
  effects: [
    ({ onSet }) => {
      onSet((region) => {
        // eslint-disable-next-line no-void
        void updateUrlQuery({ region })
      })
    },
  ],
})

/**
 * Represents a list of currently enabled countries
 * NOTE: this atom can be modified, when the selector for continents is modified.
 */
export const countriesAtom = atomFamily<Country[], string | undefined>({
  key: 'countries',
  default(region?: string) {
    return getAllCountries(region)
  },
  effects: [
    ({ onSet }) => {
      onSet((countries) => {
        // eslint-disable-next-line no-void
        void updateUrlQuery({
          country: countries.filter((country) => country.enabled).map((country) => country.country),
        })
      })
    },
  ],
})

/**
 * Represents a list of currently enabled continents.
 * NOTE: this is a selector and it's value is tied to the countries atom.
 * NOTE: this selector is mutable, i.e. it can be set(). When this happens, it also modifies the countries atom.
 */
export const continentsAtom = selectorFamily<Continent[], string | undefined>({
  key: 'continents',
  get: (region?: string) => ({ get }) => {
    const countries = get(countriesAtom(region))
    return getContinentsFromCountries(region, countries)
  },
  set: (region?: string) => ({ set, get, reset }, continentsOrDefault) => {
    const countriesOld = get(countriesAtom(region))
    const continents = continentsOrDefault instanceof DefaultValue ? getAllContinents(region) : continentsOrDefault
    const countries = toggleCountriesFromContinents(region, countriesOld, continents)
    set(countriesAtom(region), countries)
  },
})
