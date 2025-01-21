import copy from 'fast-copy'
import { get as getLodash } from 'lodash'
import Router from 'next/router'
import { selector } from 'recoil'
import { convertToArrayMaybe, includesCaseInsensitive } from 'src/helpers/array'
import {
  Continent,
  Country,
  getAllContinents,
  getContinentsFromCountries,
  regionCountryAtom,
  toggleCountriesFromContinents,
} from 'src/state/Places'
import { parseUrl } from 'src/helpers/parseUrl'
import { updateUrlQuery } from 'src/helpers/urlQuery'
import { atomAsync } from 'src/state/utils/atomAsync'
import { isDefaultValue } from 'src/state/utils/isDefaultValue'
import { perClusterDataAtom } from 'src/state/PerClusterData'
import { shouldPlotCountryAtom } from 'src/state/ShouldPlotCountry'

/**
 * Represents a list of currently enabled countries
 * NOTE: this atom can be modified, when the selector for continents is modified.
 */
export const perClusterCountriesAtom = atomAsync<Country[]>({
  key: 'perClusterCountries',
  async default({ get }) {
    const { query } = parseUrl(Router.asPath)
    const data = get(perClusterDataAtom)
    const shouldPlotCountry = get(shouldPlotCountryAtom)

    const countries = copy(data.country_names)
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
 * NOTE: this is a selector, and it's value is tied to the `countries` atom.
 * NOTE: this selector is mutable, i.e. it can be set(). When this happens, it also modifies the `countries` atom.
 */
export const perClusterContinentsAtom = selector<Continent[]>({
  key: 'perClusterContinents',
  get: ({ get }) => {
    const countries = get(perClusterCountriesAtom)
    return getContinentsFromCountries(countries)
  },
  set: ({ set, get }, continentsOrDefault) => {
    const countriesOld = get(perClusterCountriesAtom)
    const regionCountry = get(regionCountryAtom)
    const continents = isDefaultValue(continentsOrDefault) ? getAllContinents() : continentsOrDefault
    const countries = toggleCountriesFromContinents(countriesOld, continents, regionCountry)
    set(perClusterCountriesAtom, countries)
  },
})
