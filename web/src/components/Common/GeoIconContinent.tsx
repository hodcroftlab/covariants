import { get } from 'lodash'
import React, { ComponentType, Fragment, SVGProps, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { GeoIconWrapper } from 'src/components/Common/GeoIconCommon'

type S = SVGProps<SVGSVGElement>

const Africa = dynamic<S>(() => import('src/assets/images/continents/Africa.svg'), { ssr: false })
const Asia = dynamic<S>(() => import('src/assets/images/continents/Asia.svg'), { ssr: false })
const Europe = dynamic<S>(() => import('src/assets/images/continents/Europe.svg'), { ssr: false })
const NorthAmerica = dynamic<S>(() => import('src/assets/images/continents/North America.svg'), { ssr: false })
const Oceania = dynamic<S>(() => import('src/assets/images/continents/Oceania.svg'), { ssr: false })
const SouthAmerica = dynamic<S>(() => import('src/assets/images/continents/South America.svg'), { ssr: false })

export function GeoIconContinent({ continent }: { continent: string }) {
  const Icon = useMemo(() => get(CONTINENT_ICONS, continent, Fragment), [continent])
  return (
    <GeoIconWrapper>
      <Icon fill="#444444" />
    </GeoIconWrapper>
  )
}

const CONTINENT_ICONS: Record<string, ComponentType<S>> = {
  'Africa': Africa,
  'Asia': Asia,
  'Europe': Europe,
  'North America': NorthAmerica,
  'Oceania': Oceania,
  'South America': SouthAmerica,
}
