import { get } from 'lodash'
import Router from 'next/router'
import { selectorFamily, useRecoilState } from 'recoil'
import { convertToArrayMaybe, includesCaseInsensitive } from 'src/helpers/array'
import type { Continent, Country } from 'src/state/Places'
import { parseUrl } from 'src/helpers/parseUrl'
import { takeFirstMaybe } from 'src/helpers/takeFirstMaybe'
import { setUrlQuery, updateUrlQuery } from 'src/helpers/urlQuery'
import { fetchPerCountryDataRaw } from 'src/io/getPerCountryData'
import { atomAsync, atomFamilyAsync } from 'src/state/utils/atomAsync'
import { isDefaultValue } from 'src/state/utils/isDefaultValue'

import regionCountryJson from 'src/../data/region_country.json'

export const DEFAULT_REGION = 'World'

export function usePlacesPerCountry() {
  const [region, setRegion] = useRecoilState(regionAtom)
  const [countries, setCountries] = useRecoilState(countriesAtom(region))
  const [continents, setContinents] = useRecoilState(continentsAtom(region))
  return {
    region,
    setRegion,
    countries,
    setCountries,
    continents,
    setContinents,
  }
}

/**
 * Represents current region
 */
const regionAtom = atomAsync<string>({
  key: 'region',
  async default() {
    const { query } = parseUrl(Router.asPath)
    const regionRaw = takeFirstMaybe(query.region)
    if (!regionRaw) {
      return DEFAULT_REGION
    }
    return validateRegion(regionRaw)
  },
  effects: [
    ({ onSet }) => {
      onSet((region) => {
        // NOTE: This will overwrite the query entirely
        // eslint-disable-next-line no-void
        void setUrlQuery({ region })
      })
    },
  ],
})

/**
 * Represents a list of currently enabled countries
 * NOTE: this atom can be modified, when the selector for continents is modified.
 */
const countriesAtom = atomFamilyAsync<Country[], string>({
  key: 'countries',
  async default(region) {
    const { query } = parseUrl(Router.asPath)
    const { regions } = await fetchPerCountryDataRaw()

    const data = regions.find((dataRegion) => dataRegion.region === region)
    if (!data) {
      throw new Error(`Unable to find countries in region '${region}'`)
    }
    const countries = data.distributions.map(({ country }) => ({ country, enabled: true }))

    const enabledCountries = convertToArrayMaybe(get(query, 'country'))
    if (enabledCountries) {
      return countries.map((country) => ({
        ...country,
        enabled: includesCaseInsensitive(enabledCountries, country.country),
      }))
    }
    return countries
  },
  effects: [
    ({ onSet }) => {
      onSet((countries) => {
        // If all countries are enabled, we will remove country url params
        const hasAllEnabled = countries.every((country) => country.enabled)

        // eslint-disable-next-line no-void
        void updateUrlQuery({
          country: hasAllEnabled
            ? []
            : countries.filter((country) => country.enabled).map((country) => country.country),
        })
      })
    },
  ],
})

/**
 * Represents a list of currently enabled continents.
 * NOTE: this is a selector, and it's value is tied to the `countries` atom.
 * NOTE: this selector is mutable, i.e. it can be set(). When this happens, it also modifies the `countries` atom.
 */
export const continentsAtom = selectorFamily<Continent[], string>({
  key: 'continents',
  get:
    (region: string) =>
    ({ get }) => {
      const countries = get(countriesAtom(region))
      return getContinentsFromCountries(region, countries)
    },
  set:
    (region: string) =>
    ({ set, get, reset }, continentsOrDefault) => {
      const countriesOld = get(countriesAtom(region))
      const continents = isDefaultValue(continentsOrDefault) ? getAllContinents(region) : continentsOrDefault
      const countries = toggleCountriesFromContinents(region, countriesOld, continents)
      set(countriesAtom(region), countries)
    },
})

// export function useAllCountriesFromPerCountryData(region: string): Country[] {
//   const perCountryData = usePerCountryDataRaw()
//   const data = perCountryData.regions.find((dataRegion) => dataRegion.region === region)
//   if (!data) {
//     throw new RangeError(`Country data not found for region ${region}`)
//   }
//   return data.distributions.map(({ country }) => ({ country, enabled: true }))
// }
//
// export function useAllCountriesFromPerClusterData(): Country[] {
//   const perClusterData = usePerClusterDataRaw()
//   const countryNames: string[] = copy(perClusterData.country_names).sort()
//   return countryNames.map((country) => ({ country, enabled: shouldPlotCountry(country) }))
// }

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

export async function validateRegion(regionRaw: string) {
  const { regions } = await fetchPerCountryDataRaw()
  const allRegions = regions.map((region) => region.region)
  const region = allRegions.find((candidate) => candidate.toLowerCase() === regionRaw?.toLowerCase())
  if (!region) {
    const availableRegionsMsg = allRegions.map((region) => `'${region}'`).join(', ')
    throw new Error(
      `Unable to find region '${regionRaw}' requested using 'region' URL parameter. Available regions are: ${availableRegionsMsg}. Please correct your URL.`,
    )
  }
  return region
}
