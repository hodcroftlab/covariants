import { get } from 'lodash'
import React, { Fragment, useMemo } from 'react'
import iso3311a2 from 'iso-3166-1-alpha-2'
import flags from 'country-flag-icons/react/3x2'
import { GeoIconWrapper } from 'src/components/Common/GeoIconCommon'

export function GeoIconCountry({ country }: { country: string }) {
  const Icon = useMemo(() => {
    const countryCode = getCountryCode(country)
    return get(flags, countryCode, Fragment)
  }, [country])
  return (
    <GeoIconWrapper>
      <Icon />
    </GeoIconWrapper>
  )
}

function getCountryCode(country: string) {
  return MISSING_COUNTRY_CODES[country] ?? iso3311a2.getCode(country) ?? '?'
}

const MISSING_COUNTRY_CODES: Record<string, string> = {
  'Laos': 'LA',
  'Bolivia': 'BO',
  'Bonaire': 'BQ',
  'Brunei': 'BN',
  'Cabo Verde': 'CV',
  'Curacao': 'CW',
  'Democratic Republic of the Congo': 'CD',
  'Eswatini': 'SZ',
  'Iran': 'IR',
  'Kosovo': 'XK',
  'Moldova': 'MD',
  'North Macedonia': 'MK',
  'Republic of the Congo': 'CD',
  'Russia': 'RU',
  'Saint Martin': 'SX',
  'Sint Maarten': 'SX',
  'South Korea': 'KR',
  'USA': 'US',
  'Venezuela': 'VE',
  'Vietnam': 'VN',
}
