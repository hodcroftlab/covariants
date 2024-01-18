import copy from 'fast-copy'
import { get } from 'lodash'
import Router from 'next/router'
import { selector, useRecoilState } from 'recoil'
import { convertToArrayMaybe, includesCaseInsensitive } from 'src/helpers/array'
import {
  Continent,
  Country,
  getAllContinents,
  getContinentsFromCountries,
  toggleCountriesFromContinents,
} from 'src/state/Places'
import { parseUrl } from 'src/helpers/parseUrl'
import { updateUrlQuery } from 'src/helpers/urlQuery'
import { fetchPerClusterDataRaw } from 'src/io/getPerClusterData'
import { atomAsync } from 'src/state/utils/atomAsync'
import { isDefaultValue } from 'src/state/utils/isDefaultValue'
import { shouldPlotCountry } from 'src/io/getCountryColor'

export function usePlacesPerCluster() {
  const [countries, setCountries] = useRecoilState(countriesAtom)
  const [continents, setContinents] = useRecoilState(continentsAtom)
  return {
    countries,
    setCountries,
    continents,
    setContinents,
  }
}

/**
 * Represents a list of currently enabled countries
 * NOTE: this atom can be modified, when the selector for continents is modified.
 */
const countriesAtom = atomAsync<Country[]>({
  key: 'countries',
  async default() {
    const { query } = parseUrl(Router.asPath)
    const data = await fetchPerClusterDataRaw()

    const countries = copy(data.country_names)
      .sort()
      .map((country) => ({
        country,
        enabled: shouldPlotCountry(country),
      }))

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
const continentsAtom = selector<Continent[]>({
  key: 'continents',
  get: ({ get }) => {
    const countries = get(countriesAtom)
    return getContinentsFromCountries(undefined, countries)
  },
  set: ({ set, get }, continentsOrDefault) => {
    const countriesOld = get(countriesAtom)
    const continents = isDefaultValue(continentsOrDefault) ? getAllContinents() : continentsOrDefault
    const countries = toggleCountriesFromContinents(countriesOld, continents)
    set(countriesAtom, countries)
  },
})
