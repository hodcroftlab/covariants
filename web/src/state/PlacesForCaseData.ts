import { selector } from 'recoil'

import {
  Continent,
  Country,
  getAllContinents,
  getContinentsFromCountries,
  regionCountryAtom,
  toggleCountriesFromContinents,
  WHOLE_WORLD_REGION,
} from 'src/state/Places'
import { updateUrlQuery } from 'src/helpers/urlQuery'
import { fetchPerCountryCasesData } from 'src/io/getPerCountryCasesData'
import { isDefaultValue } from 'src/state/utils/isDefaultValue'
import { atomAsync } from 'src/state/utils/atomAsync'

/**
 * Represents a list of currently enabled countries
 * NOTE: this atom can be modified, when the selector for continents is modified.
 */
export const countriesCasesAtom = atomAsync<Country[]>({
  key: 'casesCountries',
  async default() {
    const clusters = await fetchPerCountryCasesData()
    return clusters.countries
  },
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
    const regionCountry = get(regionCountryAtom)
    return getContinentsFromCountries(countries, WHOLE_WORLD_REGION, regionCountry)
  },
  set: ({ set, get }, continentsOrDefault) => {
    const countriesOld = get(countriesCasesAtom)
    const regionCountry = get(regionCountryAtom)
    const continents = isDefaultValue(continentsOrDefault)
      ? getAllContinents(WHOLE_WORLD_REGION, regionCountry)
      : continentsOrDefault
    const countries = toggleCountriesFromContinents(countriesOld, continents, regionCountry)
    set(countriesCasesAtom, countries)
  },
})
