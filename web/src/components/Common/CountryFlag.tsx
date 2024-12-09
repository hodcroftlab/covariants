/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, ReactElement, SVGProps, useMemo } from 'react'

import iso3311a2 from 'iso-3166-1-alpha-2'
import Flags from 'country-flag-icons/react/3x2'

import { FlagWrapper } from './FlagWrapper'
import Africa from 'src/assets/images/continents/Africa.svg'
import Asia from 'src/assets/images/continents/Asia.svg'
import Europe from 'src/assets/images/continents/Europe.svg'
import NorthAmerica from 'src/assets/images/continents/North America.svg'
import Oceania from 'src/assets/images/continents/Oceania.svg'
import SouthAmerica from 'src/assets/images/continents/South America.svg'

export const missingCountryCodes: Record<string, string> = {
  'Bolivia': 'BO',
  'Bonaire': 'BQ',
  'Brunei': 'BN',
  'Cabo Verde': 'CV',
  'Curacao': 'CW',
  'Democratic Republic of the Congo': 'CD',
  'Eswatini': 'SZ',
  'Iran': 'IR',
  'Kosovo': 'XK',
  'Laos': 'LA',
  'Moldova': 'MD',
  'North Macedonia': 'MK',
  'Republic of the Congo': 'CD',
  'Russia': 'RU',
  'Saint Martin': 'SX',
  'Sint Maarten': 'SX',
  'South Korea': 'KR',
  'Taiwan': 'TW',
  'USA': 'US',
  'Venezuela': 'VE',
  'Vietnam': 'VN',
}

export const ContinentIcons: Record<string, FC<SVGProps<SVGElement>>> = {
  'Africa': Africa,
  'Asia': Asia,
  'Europe': Europe,
  'North America': NorthAmerica,
  'Oceania': Oceania,
  'South America': SouthAmerica,
}

export function getFlagComponent(country: string, withFallback?: boolean): ReactElement | null {
  const countryCode = missingCountryCodes[country] ?? iso3311a2.getCode(country) ?? '?'

  const Flag = Flags[countryCode]
  if (Flag) {
    return (
      <FlagWrapper>
        <Flag />
      </FlagWrapper>
    )
  }

  const ContinentIcon = ContinentIcons[country]
  if (ContinentIcon) {
    return (
      <FlagWrapper>
        <ContinentIcon fill="#444444" />
      </FlagWrapper>
    )
  }

  return withFallback ? <FlagWrapper /> : null
}

export interface CountryFlagProps extends SVGProps<SVGSVGElement> {
  country: string
  withFallback?: boolean
}

export function CountryFlag({ country, withFallback = false }: CountryFlagProps) {
  const Flag = useMemo(() => getFlagComponent(country, withFallback), [country, withFallback])

  return <>{Flag}</>
}
