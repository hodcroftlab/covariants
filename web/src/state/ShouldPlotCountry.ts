import { atomAsync } from 'src/state/utils/atomAsync'
import { CountriesToPlot, fetchShouldPlotCountry } from 'src/io/getCountryColor'

export const shouldPlotCountryAtom = atomAsync<CountriesToPlot>({
  key: 'shouldPlotCountry',
  async default() {
    return await fetchShouldPlotCountry()
  },
})
