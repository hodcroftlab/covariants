import React, { SVGProps } from 'react'

import styled from 'styled-components'
import iso3311a2 from 'iso-3166-1-alpha-2'
import Flags from 'country-flag-icons/react/3x2'

export const missingCountryCodes: Record<string, string> = {
  'USA': 'US',
  'Russia': 'RU',
  'South Korea': 'KR',
}

export const FlagDefault = styled.div<{ $countryCode?: string }>`
  height: 1em;
  width: 1.5em;
  background-color: #aaa;
`

export interface CountryFlagProps extends SVGProps<SVGSVGElement> {
  country: string
}

export function CountryFlag({ country, style }: CountryFlagProps) {
  const countryCode = missingCountryCodes[country] ?? iso3311a2.getCode(country) ?? '?'
  const Flag = Flags[countryCode]
  return Flag ? <Flag style={{ height: '1em', ...style }} /> : <FlagDefault $countryCode={countryCode} />
}
