import React, { SVGProps } from 'react'

import styled from 'styled-components'
import iso3311a2 from 'iso-3166-1-alpha-2'
import Flags from 'country-flag-icons/react/3x2'

export const missingCountryCodes: Record<string, string> = {
  'Kosovo': 'XK',
  'Bonaire': 'BQ',
  'Curacao': 'CW',
  'North Macedonia': 'MK',
  'Russia': 'RU',
  'Sint Maarten': 'SX',
  'South Korea': 'KR',
  'USA': 'US',
  'Vietnam': 'VN',
}

export const FlagWrapper = styled.div<{ $countryCode?: string }>`
  height: calc(1em + 2px);
  width: calc(1.5em + 2px);
  border: 1px solid #ced4da;
  display: flex;
  > * {
    width: 100%;
    height: 100%;
  }
`

export interface CountryFlagProps extends SVGProps<SVGSVGElement> {
  country: string
  withFallback?: boolean
}

export function CountryFlag({ country, withFallback = false }: CountryFlagProps) {
  const countryCode = missingCountryCodes[country] ?? iso3311a2.getCode(country) ?? '?'
  const Flag = Flags[countryCode]

  const fallback = withFallback ? <FlagWrapper $countryCode={countryCode} /> : null
  return Flag ? (
    <FlagWrapper>
      <Flag />
    </FlagWrapper>
  ) : (
    fallback
  )
}
