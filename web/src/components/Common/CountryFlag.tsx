import React, { SVGProps } from 'react'

import iso3311a2 from 'iso-3166-1-alpha-2'
import Flags from 'country-flag-icons/react/3x2'

const missingCountryCodes: Record<string, string> = {
  'USA': 'US',
  'Russia': 'RU',
  'South Korea': 'KR',
}

export interface CountryFlagProps extends SVGProps<SVGSVGElement> {
  country: string
}

export function CountryFlag({ country, style }: CountryFlagProps) {
  const countryCode = missingCountryCodes[country] ?? iso3311a2.getCode(country) ?? '?'
  const Flag = Flags[countryCode]
  return Flag ? <Flag style={{ height: '1em', ...style }} /> : null
}
