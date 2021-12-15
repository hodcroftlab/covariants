import React, { FC, ReactElement, SVGProps, useMemo } from 'react'

import iso3311a2 from 'iso-3166-1-alpha-2'
import Flags from 'country-flag-icons/react/3x2'

import { ReactComponent as Africa } from 'src/assets/images/continents/Africa.svg'
import { ReactComponent as Asia } from 'src/assets/images/continents/Asia.svg'
import { ReactComponent as Europe } from 'src/assets/images/continents/Europe.svg'
import { ReactComponent as NorthAmerica } from 'src/assets/images/continents/North America.svg'
import { ReactComponent as Oceania } from 'src/assets/images/continents/Oceania.svg'
import { ReactComponent as SouthAmerica } from 'src/assets/images/continents/South America.svg'

import { FlagWrapper } from './FlagWrapper'

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
