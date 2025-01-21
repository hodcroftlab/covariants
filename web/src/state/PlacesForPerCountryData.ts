import { get as getLodash } from 'lodash'
import Router from 'next/router'
import { selector, useRecoilState } from 'recoil'
import { convertToArrayMaybe, includesCaseInsensitive } from 'src/helpers/array'
import {
  DEFAULT_REGION,
  getAllContinents,
  getContinentsFromCountries,
  regionCountryAtom,
  toggleCountriesFromContinents,
} from 'src/state/Places'
import type { Country } from 'src/state/Places'
import { parseUrl } from 'src/helpers/parseUrl'
import { takeFirstMaybe } from 'src/helpers/takeFirstMaybe'
import { setUrlQuery, updateUrlQuery } from 'src/helpers/urlQuery'
import { fetchPerCountryDataRaw } from 'src/io/getPerCountryData'
import { atomAsync, atomFamilyAsync } from 'src/state/utils/atomAsync'
import { isDefaultValue } from 'src/state/utils/isDefaultValue'

export function usePlacesPerCountry() {
  const [region, setRegion] = useRecoilState(regionAtom)
  const [countries, setCountries] = useRecoilState(countriesAtom(region))
  const [continents, setContinents] = useRecoilState(continentsAtom)
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
  key: 'perCountryRegion',
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
  key: 'perCountryCountries',
  async default(region) {
    const { query } = parseUrl(Router.asPath)
    const { regions } = await fetchPerCountryDataRaw()

    const data = regions.find((dataRegion) => dataRegion.region === region)
    if (!data) {
      throw new Error(`Unable to find countries in region '${region}'`)
    }
    const countries = data.distributions.map(({ country }) => ({ country, enabled: true }))

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
const continentsAtom = selector({
  key: 'perCountryContinents',
  get: ({ get }) => {
    const region = get(regionAtom)
    const regionCountry = get(regionCountryAtom)
    const countries = get(countriesAtom(region))
    return getContinentsFromCountries(countries, region, regionCountry)
  },
  set: ({ set, get }, continentsOrDefault) => {
    const region = get(regionAtom)
    const regionCountry = get(regionCountryAtom)
    const countriesOld = get(countriesAtom(region))
    const continents = isDefaultValue(continentsOrDefault)
      ? getAllContinents(region, regionCountry)
      : continentsOrDefault
    const countries = toggleCountriesFromContinents(countriesOld, continents, regionCountry)
    set(countriesAtom(region), countries)
  },
})

export async function validateRegion(regionRaw: string) {
  const { regions } = await fetchPerCountryDataRaw()
  const allRegions = regions.map((region) => region.region)
  const region = allRegions.find((candidate) => candidate.toLowerCase() === regionRaw.toLowerCase())
  if (!region) {
    const availableRegionsMsg = allRegions.map((region) => `'${region}'`).join(', ')
    throw new Error(
      `Unable to find region '${regionRaw}' requested using 'region' URL parameter. Available regions are: ${availableRegionsMsg}. Please correct your URL.`,
    )
  }
  return region
}
