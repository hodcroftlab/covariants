import { get } from 'lodash'

import countryStyles from 'src/../data/countryStyles.json'

export function getCountryStyle(country: string) {
  return get<Record<string, { c: string; ls: string }>, string>(countryStyles, country) ?? { c: '#555555', ls: '-' }
}

export function getCountryColor(country: string) {
  return getCountryStyle(country).c
}
