import React, { SVGProps } from 'react'
import iso3311a2 from 'iso-3166-1-alpha-2'
import Flags from 'country-flag-icons/react/3x2'

import { FlagOutline } from './FlagOutline'

export const missingCountryCodes: Record<string, string> = {
  'Bonaire': 'BQ',
  'Curacao': 'CW',
  'North Macedonia': 'MK',
  'Russia': 'RU',
  'Sint Maarten': 'SX',
  'South Korea': 'KR',
  'USA': 'US',
}

export interface CountryFlagProps extends SVGProps<SVGSVGElement> {
  country: string
  withFallback?: boolean
}

export function CountryFlag({ country, withFallback = false }: CountryFlagProps) {
  const countryCode = missingCountryCodes[country] ?? iso3311a2.getCode(country) ?? '?'
  const Flag = Flags[countryCode]

  const fallback = withFallback ? <FlagOutline $missingCode={countryCode} /> : null
  return Flag ? (
    <FlagOutline>
      <Flag />
    </FlagOutline>
  ) : (
    fallback
  )
}
