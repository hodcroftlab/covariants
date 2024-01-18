import regionCountryJson from '../../public/data/region_country.json'

export const WHOLE_WORLD_REGION = 'World'
export const DEFAULT_REGION = WHOLE_WORLD_REGION

export interface Country {
  country: string
  enabled: boolean
}

export interface Continent {
  continent: string
  enabled: boolean
}

export function getAllContinents(region?: string): Continent[] {
  if (region === WHOLE_WORLD_REGION) {
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
export function toggleCountriesFromContinents(countries: Country[], continents: Continent[]): Country[] {
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
