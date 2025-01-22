import { z } from 'zod'
import { FETCHER } from 'src/hooks/useAxiosQuery'

const countriesToPlotSchema = z.record(z.string(), z.literal('True').or(z.literal('False')))

type CountriesToPlotRaw = z.infer<typeof countriesToPlotSchema>

export type CountriesToPlot = Record<string, boolean>

export async function fetchShouldPlotCountry(): Promise<CountriesToPlot> {
  const countriesToPlotRaw = await FETCHER.fetch<CountriesToPlotRaw>('/data/countriesToPlot.json')
  const countriesRaw = countriesToPlotSchema.parse(countriesToPlotRaw)
  const countries = Object.entries(countriesRaw).map(([country, shouldPlot]) => [country, shouldPlot === 'True'])
  return Object.fromEntries(countries) as CountriesToPlot
}

const countryStylesRawSchema = z.record(z.string(), z.object({ c: z.string(), ls: z.string() }))

export type CountryStylesRaw = z.infer<typeof countryStylesRawSchema>

export async function fetchCountryStyles() {
  const data = await FETCHER.fetch<CountryStylesRaw>('/data/countryStyles.json')
  return countryStylesRawSchema.parse(data)
}
