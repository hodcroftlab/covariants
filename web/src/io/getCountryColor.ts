import { get } from 'lodash'

import countriesToPlot from 'src/../data/countriesToPlot.json'
import countryStyles from 'src/../data/countryStyles.json'

import { lineStyleToStrokeDashArray } from 'src/helpers/lineStyleToStrokeDashArray'

// eslint-disable-next-line only-ascii/only-ascii
const fallbackCountry = '🌐'

export function getCountryStyle(country: string) {
  return (
    get<Record<string, { c: string; f: string; ls: string }>, string>(countryStyles, country) ?? {
      c: '#555555',
      f: fallbackCountry,
      ls: '-',
    }
  )
}

export function getCountryColor(country: string) {
  return getCountryStyle(country).c
}

export function getCountryFlag(country: string) {
  return getCountryStyle(country).f
}

export function getCountryLineStyle(country: string) {
  return getCountryStyle(country).ls
}

export function getCountryStrokeDashArray(country: string) {
  return lineStyleToStrokeDashArray(getCountryLineStyle(country))
}

export function shouldPlotCountry(country: string): boolean {
  return get(countriesToPlot, country, 'False') === 'True'
}
