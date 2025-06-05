import { selector } from 'recoil'
import { get as getLodash } from 'lodash'
import { atomAsync } from 'src/state/utils/atomAsync'
import { fetchCountryStyles } from 'src/io/getCountryColor'
import { lineStyleToStrokeDashArray } from 'src/helpers/lineStyleToStrokeDashArray'

export interface CountryStyle {
  color: string
  lineStyle: string
  strokeDashArray: string | undefined
}

export type CountryStyles = Record<string, CountryStyle>

const DEFAULT_COLOR = '#555555'
const DEFAULT_LINE_STYLE = '-'
const DEFAULT_STROKE_DASH_ARRAY = lineStyleToStrokeDashArray(DEFAULT_LINE_STYLE)

const countryStylesAtom = atomAsync<CountryStyles>({
  key: 'countryStyles',
  async default() {
    const countryStyles = await fetchCountryStyles()
    return Object.fromEntries(
      Object.entries(countryStyles).map(([country, style]) => [
        country,
        {
          color: style.c,
          lineStyle: style.ls,
          strokeDashArray: lineStyleToStrokeDashArray(style.ls),
        },
      ]),
    )
  },
})

export const getCountryStylesSelector = selector<(country: string) => CountryStyle>({
  key: 'getCountryStyles',
  get: ({ get }) => {
    const countryStyles = get(countryStylesAtom)
    return (country: string) =>
      getLodash(countryStyles, country, {
        color: DEFAULT_COLOR,
        lineStyle: DEFAULT_LINE_STYLE,
        strokeDashArray: DEFAULT_STROKE_DASH_ARRAY,
      })
  },
})
