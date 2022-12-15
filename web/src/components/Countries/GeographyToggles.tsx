import React, { useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { Button, Col, Form, FormGroup, Row } from 'reactstrap'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { Dropdown, DropdownEntry } from 'src/components/Common/Dropdown'
import { CheckboxWithIcon } from 'src/components/Common/CheckboxWithIcon'
import {
  continentAtom,
  continentNamesAtom,
  countryAtom,
  countryNamesAtom,
  geographyDisableAllAtom,
  geographyEnableAllAtom,
  regionAtom,
  regionsAtom,
} from 'src/state/Geography'

const GeoIconCountry = dynamic(() => import('src/components/Common/GeoIconCountry').then((m) => m.GeoIconCountry))
const GeoIconUsState = dynamic(() => import('src/components/Common/GeoIconUsState').then((m) => m.GeoIconUsState))
const GeoIconContinent = dynamic(() => import('src/components/Common/GeoIconContinent').then((m) => m.GeoIconContinent))

const Container = styled.div`
  display: flex;
`

export function GeographyToggles() {
  const region = useRecoilValue(regionAtom)

  const continents = useMemo(() => {
    if (region !== 'World') {
      return null
    }
    return (
      <Row noGutters className="pb-3 pt-3 border-bottom border-top">
        <Col className="d-flex">
          <ContinentCheckboxes />
        </Col>
      </Row>
    )
  }, [region])

  const countries = useMemo(
    () => (
      <Row noGutters className="mt-3">
        <Col>
          <CountryCheckboxes />
        </Col>
      </Row>
    ),
    [],
  )

  return (
    <Container>
      <RegionSwitcher />
      <GeographySelectAll />
      {continents}
      {countries}
    </Container>
  )
}

export function GeographySelectAll() {
  const { t } = useTranslationSafe()
  const region = useRecoilValue(regionAtom)
  const selectAll = useSetRecoilState(geographyEnableAllAtom(region))
  const deselectAll = useSetRecoilState(geographyDisableAllAtom(region))
  return (
    <Row noGutters>
      <Col className="d-flex">
        <FormGroup className="flex-grow-0 mx-auto">
          <Button type="button" color="link" onClick={selectAll}>
            {t('Select all')}
          </Button>
          <Button type="button" color="link" onClick={deselectAll}>
            {t('Deselect all')}
          </Button>
        </FormGroup>
      </Col>
    </Row>
  )
}

export function CountryCheckboxes() {
  const region = useRecoilValue(regionAtom)
  const countryNames = useRecoilValue(countryNamesAtom(region))
  const countryCheckboxes = useMemo(
    () => countryNames.map((country) => <CountryCheckbox key={country} country={country} />),
    [countryNames],
  )
  return <Form>{countryCheckboxes}</Form>
}

export function CountryCheckbox({ country }: { country: string }) {
  const region = useRecoilValue(regionAtom)
  const [countryEnabled, setCountryEnabled] = useRecoilState(countryAtom({ region, country }))
  const Icon = useMemo(() => {
    if (region === 'World') return <GeoIconCountry country={country} />
    if (region === 'United States') return <GeoIconUsState state={country} />
    return null
  }, [country, region])
  return <CheckboxWithIcon label={country} Icon={Icon} checked={countryEnabled} setChecked={setCountryEnabled} />
}

export function ContinentCheckboxes() {
  const region = useRecoilValue(regionAtom)
  const continentNames = useRecoilValue(continentNamesAtom(region))
  const continentCheckboxes = useMemo(() => {
    return continentNames.map((continent) => {
      return <ContinentCheckbox key={continent} continent={continent} />
    })
  }, [continentNames])

  if (region !== 'World') {
    return null
  }
  return <Form>{continentCheckboxes}</Form>
}

export function ContinentCheckbox({ continent }: { continent: string }) {
  const region = useRecoilValue(regionAtom)
  const [continentEnabled, setContinentEnabled] = useRecoilState(continentAtom({ region, continent }))
  const Icon = useMemo(() => <GeoIconContinent continent={continent} />, [continent])
  return <CheckboxWithIcon label={continent} Icon={Icon} checked={continentEnabled} setChecked={setContinentEnabled} />
}

export function RegionSwitcher() {
  const { t } = useTranslationSafe()
  const regions = useRecoilValue(regionsAtom)
  const [region, setRegion] = useRecoilState(regionAtom)

  const setCurrentEntry = useCallback((entry: DropdownEntry) => setRegion(entry.key), [setRegion])

  const { entries } = useMemo(() => {
    const entries = regions.map((region) => ({ key: region, value: t(region) }))
    return { entries }
  }, [regions, t])

  const currentEntry = useMemo(() => {
    const currentEntry = entries.find((entry) => entry.key === region)
    if (!currentEntry) {
      return entries[0]
    }
    return currentEntry
  }, [entries, region])

  return (
    <Row noGutters>
      <Col>
        <Dropdown entries={entries} currentEntry={currentEntry} setCurrentEntry={setCurrentEntry} />
      </Col>
    </Row>
  )
}
