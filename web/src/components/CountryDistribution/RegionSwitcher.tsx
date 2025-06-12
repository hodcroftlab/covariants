import React, { useCallback } from 'react'

import { Button } from 'reactstrap'
import { styled } from 'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import { safeZip } from 'src/helpers/safeZip'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { perCountryDataRegionsSelector } from 'src/state/PerCountryData'
import { perCountryRegionAtom } from 'src/state/PlacesForPerCountryData'

export const RegionButton = styled(Button)`
  flex-wrap: wrap;
  flex: 0;
  width: 175px;
  margin: 5px 5px;
`

export function RegionSwitcher() {
  const { t } = useTranslationSafe()

  const { regionNames, regionsHaveData } = useRecoilValue(perCountryDataRegionsSelector)
  const [currentRegion, setCurrentRegion] = useRecoilState(perCountryRegionAtom)

  const onRegionButtonClick = useCallback((region: string) => () => setCurrentRegion(region), [setCurrentRegion])
  const getRegionButtonColor = (region: string) => (currentRegion === region ? 'success' : 'dark')

  return (
    <div className={'p-1 m-1'}>
      <h4 className="text-center">{t('Choose region')}</h4>

      <div className="d-flex">
        <span className="mx-auto d-flex flex-wrap">
          {safeZip(regionNames, regionsHaveData).map(([region, regionHaveData]) => (
            <span className="d-flex flex-column m-auto" key={region}>
              <RegionButton
                color={getRegionButtonColor(region)}
                onClick={onRegionButtonClick(region)}
                disabled={!regionHaveData}
                title={regionHaveData ? t(region) : t('Coming soon!')}
                outline={currentRegion !== region}
              >
                {t(region)}
              </RegionButton>
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}
