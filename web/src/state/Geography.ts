import copy from 'fast-copy'
import { atom, atomFamily, selector, selectorFamily } from 'recoil'
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

const continentsAtom = atomFamily<{ continent: string; enabled: boolean }[], string>({
  key: 'continentsAtom',
  default: (region) =>
    selector({
      key: `continentsAtom/default/${region}`,
      get: ({ get }) => {
        return getAllContinentNames(get(geographyAtom).regions[region]).map((continent) => ({
          continent,
          enabled: true,
        }))
      },
    }),
})

export const continentNamesAtom = atomFamily<string[], string>({
  key: 'continentNamesAtom',
  default: (region) =>
    selector({
      key: `continentNamesAtom/default/${region}`,
      get({ get }) {
        return getAllContinentNames(get(geographyAtom).regions[region])
      },
    }),
})

export const continentAtom = selectorFamily<boolean, { region: string; continent: string }>({
  key: 'continentAtom',
  get:
    ({ region, continent }) =>
    ({ get }) => {
      return get(continentsAtom(region)).find((candidate) => candidate.continent === continent)?.enabled ?? false
    },
  set:
    ({ region, continent }) =>
    ({ get, set, reset }, enabled) => {
      if (isDefaultValue(enabled)) {
        reset(continentsAtom(region))
      } else {
        const continents = copy(get(continentsAtom(region)))
        continents.forEach((item) => {
          if (item.continent === continent) {
            item.enabled = enabled
          }
        })
        set(continentsAtom(region), continents)
      }
    },
})

function getAllCountryNames(regions: Record<string, string[]>) {
  return Object.entries(regions).flatMap(([_, countries]) => countries)
}

const countriesAtom = atomFamily<{ country: string; enabled: boolean }[], string>({
  key: 'countriesAtom',
  default: (region) =>
    selector({
      key: `countriesAtom/default/${region}`,
      get({ get }) {
        return getAllCountryNames(get(geographyAtom).regions[region]).map((country) => ({ country, enabled: true }))
      },
    }),
})

export const countryNamesAtom = atomFamily<string[], string>({
  key: 'countryNamesAtom',
  default: (region) =>
    selector({
      key: `countryNamesAtom/default/${region}`,
      get({ get }) {
        return getAllCountryNames(get(geographyAtom).regions[region])
      },
    }),
})

export const countryAtom = selectorFamily<boolean, { region: string; country: string }>({
  key: 'countryAtom',
  get:
    ({ region, country }) =>
    ({ get }) => {
      return get(countriesAtom(region)).find((candidate) => candidate.country === country)?.enabled ?? false
    },
  set:
    ({ region, country }) =>
    ({ get, set, reset }, enabled) => {
      if (isDefaultValue(enabled)) {
        reset(countriesAtom(region))
      } else {
        const countries = copy(get(countriesAtom(region)))
        countries.forEach((item) => {
          if (item.country === country) {
            item.enabled = enabled
          }
        })
        set(countriesAtom(region), countries)
      }
    },
})

function setEnabledAll<T extends { enabled: boolean }>(items: T[], enabled: boolean) {
  return items.map((item) => ({ ...item, enabled }))
}

export const geographyEnableAllAtom = selectorFamily<unknown, string>({
  key: 'geographyEnableAllAtom',
  get() {
    throw new ErrorInternal("Attempt to read from write-only atom: 'geographyEnableAllAtom'")
  },
  set:
    (region) =>
    ({ get, set }) => {
      set(countriesAtom(region), setEnabledAll(get(countriesAtom(region)), true))
      set(continentsAtom(region), setEnabledAll(get(continentsAtom(region)), true))
    },
})

export const geographyDisableAllAtom = selectorFamily<unknown, string>({
  key: 'geographyDisableAllAtom',
  get() {
    throw new ErrorInternal("Attempt to read from write-only atom: 'geographyDisableAllAtom'")
  },
  set:
    (region) =>
    ({ get, set }) => {
      set(countriesAtom(region), setEnabledAll(get(countriesAtom(region)), false))
      set(continentsAtom(region), setEnabledAll(get(continentsAtom(region)), false))
    },
})
