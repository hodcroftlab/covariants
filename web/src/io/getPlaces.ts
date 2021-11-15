import copy from 'fast-copy'
import { pickBy, sortBy } from 'lodash'

import regionCountryJson from 'src/../data/region_country.json'

export interface Country {
  countryName: string
  enabled: boolean
}

export type CountriesMap = Record<string, Country>

export interface Continent {
  continentName: string
  enabled: boolean
  countries: CountriesMap
}

export type ContinentsMap = Record<string, Continent>

export interface Places {
  continents: ContinentsMap
}

/** Constructs `Places` object from raw data  */
export function getPlaces(countriesListRaw: { countryName: string; enabled: boolean }[], regionName = 'World'): Places {
  const allCountries: CountriesMap = countriesListRaw.reduce((result, { countryName, enabled }) => {
    return { ...result, [countryName]: { countryName, enabled } }
  }, {})

  let entries: [string, Continent][] = []
  if (regionName === 'World') {
    // "World" region has countries grouped into continents
    entries = Object.entries(regionCountryJson).map(([continentName, countryNames]) => {
      const countries = pickBy(allCountries, (country) => countryNames.includes(country.countryName))
      return [continentName, { continentName, countries, enabled: true }]
    })
  } else {
    entries = [
      // Regions other than "World" have 1 "continent" and all "countries" are included into it
      [regionName, { continentName: regionName, countries: allCountries, enabled: true }],
    ]
  }

  const continents: ContinentsMap = Object.fromEntries(entries)

  return { continents }
}

export function getEnabledCountriesNames(places: Places): Set<string> {
  const results = new Set<string>()
  Object.values(places.continents).forEach((continent) => {
    if (continent.enabled) {
      Object.values(continent.countries).forEach((country) => {
        if (country.enabled) {
          results.add(country.countryName)
        }
      })
    }
  })
  return results
}

/** Returns flat sorted array of all countries */
export function getCountries(places: Places): Country[] {
  const countries: Country[] = []
  Object.values(places.continents).forEach((continent) => {
    countries.push(...Object.values(continent.countries))
  })
  return sortBy(countries, (country) => country.countryName)
}

/** Returns array of all continents */
export function getContinents(places: Places): Continent[] {
  return Object.values(places.continents)
}

/** Toggles a given country enabled/disabled in the `Places` */
export function toggleCountry(oldPlaces: Places, countryName: string): Places {
  const places = copy(oldPlaces)

  Object.values(places.continents).forEach((continent) => {
    Object.values(continent.countries).forEach((country) => {
      if (country.countryName === countryName) {
        country.enabled = !country.enabled // That's the toggle
      }
    })
    // Continent is enabled if at least one of its countries is enabled
    continent.enabled = Object.values(continent.countries).some(({ enabled }) => enabled)
  })
  return places
}

/** Toggles a given continent enabled/disabled in the `Places` */
export function toggleContinent(oldPlaces: Places, continentName: string): Places {
  const places = copy(oldPlaces)

  Object.values(places.continents).forEach((continent) => {
    if (continent.continentName === continentName) {
      continent.enabled = !continent.enabled // That's the toggle

      // Disable all the countries of this continent. Should we?
      Object.values(continent.countries).forEach((country) => {
        country.enabled = continent.enabled
      })
    }
  })
  return places
}

export function setAllPlacesEnabled(oldPlaces: Places, enabled: boolean): Places {
  const places = copy(oldPlaces)
  Object.values(places.continents).forEach((continent) => {
    continent.enabled = enabled
    Object.values(continent.countries).forEach((country) => {
      country.enabled = enabled
    })
  })
  return places
}

export function disableAllPlaces(oldPlaces: Places): Places {
  return setAllPlacesEnabled(oldPlaces, false)
}

export function enableAllPlaces(oldPlaces: Places): Places {
  return setAllPlacesEnabled(oldPlaces, true)
}
