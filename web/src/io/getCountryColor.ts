import { get } from 'lodash'

import { z } from 'zod'
import countriesToPlot from 'src/../public/data/countriesToPlot.json'

import { lineStyleToStrokeDashArray } from 'src/helpers/lineStyleToStrokeDashArray'
import { useValidatedAxiosQuery } from 'src/hooks/useAxiosQuery'

export function shouldPlotCountry(country: string): boolean {
  return get<object, string, 'False' | 'True'>(countriesToPlot, country, 'False') === 'True'
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
