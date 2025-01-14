import { get } from 'lodash'

import { z } from 'zod'

import { lineStyleToStrokeDashArray } from 'src/helpers/lineStyleToStrokeDashArray'
import { FETCHER, useValidatedAxiosQuery } from 'src/hooks/useAxiosQuery'

const countriesToPlot = z.record(z.string(), z.literal('True').or(z.literal('False')))

type CountriesToPlot = z.infer<typeof countriesToPlot>

export async function getShouldPlotCountry(): Promise<(country: string) => boolean> {
  const countriesToPlotRaw = await FETCHER.fetch<CountriesToPlot>('/data/countriesToPlot.json')
  const countries = countriesToPlot.parse(countriesToPlotRaw)
  return (country: string) => get<object, string, 'False' | 'True'>(countries, country, 'False') === 'True'
}

const countryStyles = z.record(z.string(), z.object({ c: z.string(), ls: z.string() }))

export type CountryStyles = z.infer<typeof countryStyles>

export function useCountryStyle() {
  const { data: styles } = useValidatedAxiosQuery<CountryStyles>('/data/countryStyles.json', countryStyles)
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
