import { fetchPerClusterDataRaw, PerClusterDataRaw } from 'src/io/getPerClusterData'
import { atomAsync } from 'src/state/utils/atomAsync'

export const perClusterDataAtom = atomAsync<PerClusterDataRaw>({
  key: 'perClusterData',
  async default() {
    return await fetchPerClusterDataRaw()
  },
})
