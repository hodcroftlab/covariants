import { get as getLodash } from 'lodash'
import Router from 'next/router'
import { selector } from 'recoil'
import { convertToArrayMaybe, includesCaseInsensitive, takeFirstMaybe } from 'src/helpers/array'
import {
  DEFAULT_REGION,
  getAllContinents,
  getContinentsFromCountries,
  regionCountryAtom,
  toggleCountriesFromContinents,
} from 'src/state/Places'
import type { Country } from 'src/state/Places'
import { parseUrl } from 'src/helpers/parseUrl'
import { updateUrlQuery } from 'src/helpers/urlQuery'
import { isDefaultValue } from 'src/state/utils/isDefaultValue'
import { perCountryDataDistributionsSelector, perCountryDataRegionsSelector } from 'src/state/PerCountryData'
import { atomDefault, atomFamilyDefault } from 'src/state/utils/atomDefault'
import { updateUrlOnMismatch } from 'src/state/Clusters'
import { clustersForPerCountryDataAtom } from 'src/state/ClustersForPerCountryData'

/**
 * Represents current region
 */
export const perCountryRegionAtom = atomDefault({
  key: 'perCountryRegion',
  default: ({ get }) => {
    const { query } = parseUrl(Router.asPath)
    const regionRaw = takeFirstMaybe(query.region)
    if (!regionRaw) {
      return DEFAULT_REGION
    }
    const { regionNames } = get(perCountryDataRegionsSelector)
    return validateRegion(regionRaw, regionNames)
  },
  effects: [
    ({ onSet, getPromise }) => {
      onSet((region) => {
        // update url when navigating the regions
        Promise.all([getPromise(perCountryCountriesAtom(region)), getPromise(clustersForPerCountryDataAtom(region))])
          .then(([countries, clusters]) => {
            updateUrlOnMismatch(countries, clusters, region)
            return true
          })
          .catch((error: Error) => {
            throw error
          })
      })
    },
  ],
})

/**
 * Represents a list of currently enabled countries
 * NOTE: this atom can be modified, when the selector for continents is modified.
 */
export const perCountryCountriesAtom = atomFamilyDefault<Country[], string>({
  key: 'perCountryCountries',
  default: (region, { get }) => {
    const { query } = parseUrl(Router.asPath)
    const distributions = get(perCountryDataDistributionsSelector(region))
    const countries = distributions.map(({ country }) => ({ country, enabled: true }))
    const regionFromUrl = getLodash(query, 'region')
    const enabledCountriesFromUrl = convertToArrayMaybe(getLodash(query, 'country'))

    if (enabledCountriesFromUrl && regionFromUrl === region) {
      return countries.map((country) => ({
        ...country,
        enabled: includesCaseInsensitive(enabledCountriesFromUrl, country.country),
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
export const perCountryContinentsAtom = selector({
  key: 'perCountryContinents',
  get: ({ get }) => {
    const region = get(perCountryRegionAtom)
    const regionCountry = get(regionCountryAtom)
    const countries = get(perCountryCountriesAtom(region))
    return getContinentsFromCountries(countries, region, regionCountry)
  },
  set: ({ set, get }, continentsOrDefault) => {
    const region = get(perCountryRegionAtom)
    const regionCountry = get(regionCountryAtom)
    const countriesOld = get(perCountryCountriesAtom(region))
    const continents = isDefaultValue(continentsOrDefault)
      ? getAllContinents(region, regionCountry)
      : continentsOrDefault
    const countries = toggleCountriesFromContinents(countriesOld, continents, regionCountry)
    set(perCountryCountriesAtom(region), countries)
  },
})

export function validateRegion(regionRaw: string, regionNames: string[]) {
  const region = regionNames.find((candidate) => candidate.toLowerCase() === regionRaw.toLowerCase())
  if (!region) {
    const availableRegionsMsg = regionNames.map((region) => `'${region}'`).join(', ')
    throw new Error(
      `Unable to find region '${regionRaw}' requested using 'region' URL parameter. Available regions are: ${availableRegionsMsg}. Please correct your URL.`,
    )
  }
  return region
}
