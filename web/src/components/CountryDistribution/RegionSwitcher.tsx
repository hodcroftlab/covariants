import React, { useCallback } from 'react'

import { Button, Col, Row } from 'reactstrap'
import { safeZip } from 'src/helpers/safeZip'
import styled from 'styled-components'

import { Region } from 'src/io/getPerCountryData'

export const RegionSwitcherContainer = styled.div`
  margin: 5px 5px;
  padding: 0.65rem 1rem;
  border-radius: 3px;
`

export const RegionSwitcherHeading = styled.h4`
  text-align: center;
`

export const RegionButtonsContainer = styled.span`
  display: flex;
  flex-wrap: wrap;
`

export const RegionButtonWrapper = styled.span`
  display: flex;
  flex-direction: column;
  margin: auto;
`

export const RegionButton = styled(Button)`
  flex-wrap: wrap;
  flex: 0;
  width: 175px;
  margin: 5px 5px;
`

export interface RegionSwitcherProps {
  regions: Region[]
  regionsHaveData: boolean[]
  currentRegion: string
  setCurrentRegion(region: Region): void
}

export function RegionSwitcher({ regions, regionsHaveData, currentRegion, setCurrentRegion }: RegionSwitcherProps) {
  const onRegionButtonClick = useCallback((region: Region) => () => setCurrentRegion(region), [setCurrentRegion])
  const getRegionButtonColor = (region: string) => (currentRegion === region ? 'success' : undefined)

  return (
    <RegionSwitcherContainer>
      <Row noGutters>
        <Col>
          <RegionSwitcherHeading>{'Choose region'}</RegionSwitcherHeading>
        </Col>
      </Row>

      <Row noGutters>
        <Col className="d-flex">
          <RegionButtonsContainer className="mx-auto">
            {safeZip(regions, regionsHaveData).map(([region, regionHaveData]) => (
              <RegionButtonWrapper key={region}>
                <RegionButton
                  color={getRegionButtonColor(region)}
                  onClick={onRegionButtonClick(region)}
                  disabled={!regionHaveData}
                  title={regionHaveData ? region : 'Coming soon!'}
                >
                  {region}
                </RegionButton>
              </RegionButtonWrapper>
            ))}
          </RegionButtonsContainer>
        </Col>
      </Row>
    </RegionSwitcherContainer>
  )
}
