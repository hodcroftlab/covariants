import { fetchLastUpdated } from 'src/io/getLastUpdated'
import { atomAsync } from 'src/state/utils/atomAsync'

export const lastUpdatedAtom = atomAsync({
  key: 'lastUpdated',
  async default() {
    return fetchLastUpdated()
  },
})
