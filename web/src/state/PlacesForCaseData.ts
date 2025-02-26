import { selector } from 'recoil'

import Router from 'next/router'
import { get as getLodash } from 'lodash'
import {
  Continent,
  Country,
  getAllContinents,
  getContinentsFromCountries,
  regionCountryAtom,
  REGIONS,
  toggleCountriesFromContinents,
} from 'src/state/Places'
import { updateUrlQuery } from 'src/helpers/urlQuery'
import { isDefaultValue } from 'src/state/utils/isDefaultValue'
import { perCountryCasesDataSelector } from 'src/state/PerCountryCasesData'
import { atomDefault } from 'src/state/utils/atomDefault'
import { parseUrl } from 'src/helpers/parseUrl'
import { convertToArrayMaybe, includesCaseInsensitive } from 'src/helpers/array'
import { shouldPlotCountryAtom } from 'src/state/ShouldPlotCountry'

/**
 * Represents a list of currently enabled countries
 * NOTE: this atom can be modified, when the selector for continents is modified.
 */
export const countriesCasesAtom = atomDefault<Country[]>({
  key: 'casesCountries',
  default: ({ get }) => {
    const { query } = parseUrl(Router.asPath)
    const data = get(perCountryCasesDataSelector)
    const shouldPlotCountry = get(shouldPlotCountryAtom)

    const countries = data.countries
      .map((c) => c.country)
      .sort()
      .map((country) => ({
        country,
        enabled: shouldPlotCountry[country],
      }))

    const enabledCountries = convertToArrayMaybe(getLodash(query, 'country'))
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
    return getContinentsFromCountries(countries, REGIONS.WORLD, regionCountry)
  },
  set: ({ set, get }, continentsOrDefault) => {
    const countriesOld = get(countriesCasesAtom)
    const regionCountry = get(regionCountryAtom)
    const continents = isDefaultValue(continentsOrDefault)
      ? getAllContinents(REGIONS.WORLD, regionCountry)
      : continentsOrDefault
    const countries = toggleCountriesFromContinents(countriesOld, continents, regionCountry)
    set(countriesCasesAtom, countries)
  },
})
