import { z } from 'zod'
import { FETCHER } from 'src/hooks/useAxiosQuery'

const countriesToPlotSchema = z.record(z.string(), z.literal('True').or(z.literal('False')))

export type CountriesToPlot = Record<string, boolean>

export async function fetchShouldPlotCountry(): Promise<CountriesToPlot> {
  const countriesRaw = await FETCHER.validatedFetch('/data/countriesToPlot.json', countriesToPlotSchema)
  const countries = Object.entries(countriesRaw).map(([country, shouldPlot]) => [country, shouldPlot === 'True'])
  return Object.fromEntries(countries) as CountriesToPlot
}

const countryStylesRawSchema = z.record(z.string(), z.object({ c: z.string(), ls: z.string() }))

export async function fetchCountryStyles() {
  return await FETCHER.validatedFetch('/data/countryStyles.json', countryStylesRawSchema)
}
