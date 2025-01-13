import { atom, DefaultValue, selector } from 'recoil'

// TODO: replace with dynamic call
import regionCountryJson from '../../public/data/region_country.json'
import type { Continent, Country } from 'src/state/Places'
import { updateUrlQuery } from 'src/helpers/urlQuery'
import { getPerCountryCasesData } from 'src/io/getPerCountryCasesData'

function getAllCountries(): Country[] {
  return getPerCountryCasesData().countries
}

export function getAllContinents(): Continent[] {
  return Object.keys(regionCountryJson).map((continent) => ({ continent, enabled: true }))
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
function getContinentsFromCountries(countries: Country[]): Continent[] {
  // Continents are only relevant for the 'World' region
  return Object.entries(regionCountryJson).map(([continent, continentCountries]) => {
    // A continent is enabled if every country of this continent is enabled
    const enabled = continentCountries.every((continentCountry) => {
      const countryFound = countries.find((country) => country.country === continentCountry)
      return countryFound?.enabled ?? true
    })
    return { continent, enabled }
  })
}

/**
 * Represents a list of currently enabled countries
 * NOTE: this atom can be modified, when the selector for continents is modified.
 */
export const countriesCasesAtom = atom<Country[]>({
  key: 'casesCountries',
  default: getAllCountries(),
  effects: [
    ({ onSet }) => {
      onSet((countries) => {
        // If all countries are enabled, we will remove country url params
        const hasAllEnabled = countries.every((country) => country.enabled)

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
 * NOTE: this is a selector, and it's value is tied to the countries' atom.
 * NOTE: this selector is mutable, i.e. it can be set(). When this happens, it also modifies the countries' atom.
 */
export const continentsCasesAtom = selector<Continent[]>({
  key: 'casesContinents',
  get: ({ get }) => {
    const countries = get(countriesCasesAtom)
    return getContinentsFromCountries(countries)
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  set: ({ set, get, reset }, continentsOrDefault) => {
    const countriesOld = get(countriesCasesAtom)
    const continents = continentsOrDefault instanceof DefaultValue ? getAllContinents() : continentsOrDefault
    const countries = toggleCountriesFromContinents(countriesOld, continents)
    set(countriesCasesAtom, countries)
  },
})
