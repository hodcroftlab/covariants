import { get } from 'lodash'

import countriesToPlot from 'src/../data/countriesToPlot.json'
import countryStyles from 'src/../data/countryStyles.json'

import { lineStyleToStrokeDashArray } from 'src/helpers/lineStyleToStrokeDashArray'

export function getCountryStyle(country: string) {
  return get<Record<string, { c: string; ls: string }>, string>(countryStyles, country) ?? { c: '#555555', ls: '-' }
}

export function getCountryColor(country: string) {
  return getCountryStyle(country).c
}

export function getCountryLineStyle(country: string) {
  return getCountryStyle(country).ls
}

export function getCountryStrokeDashArray(country: string) {
  return lineStyleToStrokeDashArray(getCountryLineStyle(country))
}

export function shouldPlotCountry(country: string): boolean {
  const shouldPlot = get(countriesToPlot, country, 'False') as 'False' | 'True'
  return shouldPlot === 'True'
}
