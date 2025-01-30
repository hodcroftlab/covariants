import { selector } from 'recoil'
import { atomAsync } from 'src/state/utils/atomAsync'
import {
  fetchPerCountryCasesDataRaw,
  mapPerCountryCasesData,
  PerCountryCasesDataRaw,
} from 'src/io/getPerCountryCasesData'
import { clusterNamesSelector } from 'src/state/Clusters'

export const perCountryCasesDataAtom = atomAsync<PerCountryCasesDataRaw>({
  key: 'perCountryCasesDataRaw',
  async default() {
    return await fetchPerCountryCasesDataRaw()
  },
})

export const perCountryCasesDataSelector = selector({
  key: 'perCountryCasesData',
  get: ({ get }) => {
    const allData = get(perCountryCasesDataAtom)
    const allClusterNames = get(clusterNamesSelector)

    return mapPerCountryCasesData(allData, allClusterNames)
  },
})
