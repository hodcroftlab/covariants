import copy from 'fast-copy'
import { atom, selector, selectorFamily } from 'recoil'
import { axiosFetch } from 'src/io/axiosFetch'
import { getDataRootUrl } from 'src/io/getDataRootUrl'
import urljoin from 'url-join'
import { isDefaultValue } from 'src/state/utils/isDefaultValue'
import { ErrorInternal } from 'src/helpers/ErrorInternal'

export interface Geography {
  regions: Record<string, Record<string, string[]>>
}

const geographyAtom = atom<Geography>({
  key: 'geographyAtom',
  default: axiosFetch<Geography>(urljoin(getDataRootUrl(), 'v2/geography.json')),
})

export const regionsAtom = selector({
  key: 'regionsAtom',
  get({ get }) {
    return Object.keys(get(geographyAtom).regions)
  },
})

export const regionAtom = atom({
  key: 'regionAtom',
  default: 'World',
})

function getAllContinentNames(region: Record<string, string[]>) {
  return Object.keys(region)
}

const continentsAtom = atom<{ continent: string; enabled: boolean }[]>({
  key: 'continentsAtom',
  default: selector({
    key: 'continentsAtom/default',
    get({ get }) {
      const region = get(regionAtom)
      return getAllContinentNames(get(geographyAtom).regions[region]).map((continent) => ({ continent, enabled: true }))
    },
  }),
})

export const continentNamesAtom = atom<string[]>({
  key: 'continentNamesAtom',
  default: selector({
    key: 'continentNamesAtom/default',
    get({ get }) {
      const region = get(regionAtom)
      return getAllContinentNames(get(geographyAtom).regions[region])
    },
  }),
})

export const continentAtom = selectorFamily<boolean, string>({
  key: 'continentAtom',
  get:
    (continent) =>
    ({ get }) => {
      return get(continentsAtom).find((candidate) => candidate.continent === continent)?.enabled ?? false
    },
  set:
    (continent) =>
    ({ get, set, reset }, enabled) => {
      if (isDefaultValue(enabled)) {
        reset(continentsAtom)
      } else {
        const continents = copy(get(continentsAtom))
        continents.forEach((item) => {
          if (item.continent === continent) {
            item.enabled = enabled
          }
        })
        set(continentsAtom, continents)
      }
    },
})

function getAllCountryNames(regions: Record<string, string[]>) {
  return Object.entries(regions).flatMap(([_, countries]) => countries)
}

const countriesAtom = atom<{ country: string; enabled: boolean }[]>({
  key: 'countriesAtom',
  default: selector({
    key: 'countriesAtom/default',
    get({ get }) {
      const region = get(regionAtom)
      return getAllCountryNames(get(geographyAtom).regions[region]).map((country) => ({ country, enabled: true }))
    },
  }),
})

export const countryNamesAtom = atom<string[]>({
  key: 'countryNamesAtom',
  default: selector({
    key: 'countryNamesAtom/default',
    get({ get }) {
      const region = get(regionAtom)
      return getAllCountryNames(get(geographyAtom).regions[region])
    },
  }),
})

export const countryAtom = selectorFamily<boolean, string>({
  key: 'countryAtom',
  get:
    (country) =>
    ({ get }) => {
      return get(countriesAtom).find((candidate) => candidate.country === country)?.enabled ?? false
    },
  set:
    (country) =>
    ({ get, set, reset }, enabled) => {
      if (isDefaultValue(enabled)) {
        reset(countriesAtom)
      } else {
        const countries = copy(get(countriesAtom))
        countries.forEach((item) => {
          if (item.country === country) {
            item.enabled = enabled
          }
        })
        set(countriesAtom, countries)
      }
    },
})

function setEnabledAll<T extends { enabled: boolean }>(items: T[], enabled: boolean) {
  return items.map((item) => ({ ...item, enabled }))
}

export const geographyEnableAllAtom = selector<unknown>({
  key: 'geographyEnableAllAtom',
  get() {
    throw new ErrorInternal("Attempt to read from write-only atom: 'geographyEnableAllAtom'")
  },
  set({ get, set }) {
    set(countriesAtom, setEnabledAll(get(countriesAtom), true))
    set(continentsAtom, setEnabledAll(get(continentsAtom), true))
  },
})

export const geographyDisableAllAtom = selector<unknown>({
  key: 'geographyDisableAllAtom',
  get() {
    throw new ErrorInternal("Attempt to read from write-only atom: 'geographyDisableAllAtom'")
  },
  set({ get, set }) {
    set(countriesAtom, setEnabledAll(get(countriesAtom), false))
    set(continentsAtom, setEnabledAll(get(continentsAtom), false))
  },
})
