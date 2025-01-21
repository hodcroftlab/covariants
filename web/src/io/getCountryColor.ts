import { get } from 'lodash'

import { z } from 'zod'

import { lineStyleToStrokeDashArray } from 'src/helpers/lineStyleToStrokeDashArray'
import { FETCHER, useValidatedAxiosQuery } from 'src/hooks/useAxiosQuery'

const countriesToPlotSchema = z.record(z.string(), z.literal('True').or(z.literal('False')))

type CountriesToPlotRaw = z.infer<typeof countriesToPlotSchema>

export type CountriesToPlot = Record<string, boolean>

export async function fetchShouldPlotCountry(): Promise<CountriesToPlot> {
  const countriesToPlotRaw = await FETCHER.fetch<CountriesToPlotRaw>('/data/countriesToPlot.json')
  const countriesRaw = countriesToPlotSchema.parse(countriesToPlotRaw)
  const countries = Object.entries(countriesRaw).map(([country, shouldPlot]) => [country, shouldPlot === 'True'])
  return Object.fromEntries(countries) as CountriesToPlot
}

const countryStylesSchema = z.record(z.string(), z.object({ c: z.string(), ls: z.string() }))

export type CountryStyles = z.infer<typeof countryStylesSchema>

export function useCountryStyle() {
  const { data: styles } = useValidatedAxiosQuery<CountryStyles>('/data/countryStyles.json', countryStylesSchema)
  return (country: string) => get(styles, country, { c: '#555555', ls: '-' })
}

export function useCountryColor() {
  const countryStyle = useCountryStyle()
  return (country: string) => countryStyle(country).c
}

export function useCountryLineStyle() {
  const countryStyle = useCountryStyle()
  return (country: string) => countryStyle(country).ls
}

export function useCountryStrokeDashArray() {
  const countryLineStyle = useCountryLineStyle()
  return (country: string) => lineStyleToStrokeDashArray(countryLineStyle(country))
}
