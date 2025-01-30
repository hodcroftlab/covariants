import { selector, selectorFamily } from 'recoil'
import { atomAsync } from 'src/state/utils/atomAsync'
import { fetchPerCountryDataRaw, PerCountryDataRaw } from 'src/io/getPerCountryData'
import { perCountryRegionAtom } from 'src/state/PlacesForPerCountryData'

export const perCountryDataAtom = atomAsync<PerCountryDataRaw>({
  key: 'perCountryData',
  async default() {
    return await fetchPerCountryDataRaw()
  },
})

export const perCountryDataRegionSelector = selectorFamily({
  key: 'perCountryDataRegion',
  get:
    (region: string) =>
    ({ get }) => {
      const allData = get(perCountryDataAtom)
      const perCountryData = allData.regions.find((candidate) => candidate.region === region)
      if (!perCountryData) {
        throw new Error(`Per-country data not found for region: ${region}`)
      }
      return perCountryData
    },
})

export const perCountryDataDistributionsSelector = selectorFamily({
  key: 'perCountryDataDistributions',
  get:
    (region: string) =>
    ({ get }) => {
      return get(perCountryDataRegionSelector(region)).distributions
    },
})

export const perCountryDataRegionsSelector = selector({
  key: 'perCountryDataRegions',
  get: ({ get }) => {
    const allData = get(perCountryDataAtom)
    const regionNames = allData.regions.map(({ region }) => region)
    const regionsHaveData = allData.regions.map(
      // eslint-disable-next-line camelcase
      ({ cluster_names, distributions }) => cluster_names.length > 0 && distributions.length > 0,
    )

    return {
      regionNames,
      regionsHaveData,
    }
  },
})

export const perCountryDataIntroContentFilenameSelector = selector({
  key: 'perCountryIntroContentFilename',
  get: ({ get }) => {
    const region = get(perCountryRegionAtom)
    return get(perCountryDataRegionSelector(region)).per_country_intro_content
  },
})
