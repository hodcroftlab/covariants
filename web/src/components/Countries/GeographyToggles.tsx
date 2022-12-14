import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { Button, Col, Form, FormGroup, Row } from 'reactstrap'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { CheckboxWithIcon } from 'src/components/Common/CheckboxWithIcon'
import {
  continentAtom,
  continentNamesAtom,
  countryAtom,
  countryNamesAtom,
  geographyDisableAllAtom,
  geographyEnableAllAtom,
  regionAtom,
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
      <GeographySelectAll />
      {continents}
      {countries}
    </Container>
  )
}

export function GeographySelectAll() {
  const { t } = useTranslationSafe()
  const selectAll = useSetRecoilState(geographyEnableAllAtom)
  const deselectAll = useSetRecoilState(geographyDisableAllAtom)
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
  const countryNames = useRecoilValue(countryNamesAtom)
  const countryCheckboxes = useMemo(
    () => countryNames.map((country) => <CountryCheckbox key={country} country={country} />),
    [countryNames],
  )
  return <Form>{countryCheckboxes}</Form>
}

export function CountryCheckbox({ country }: { country: string }) {
  const region = useRecoilValue(regionAtom)
  const [countryEnabled, setCountryEnabled] = useRecoilState(countryAtom(country))
  const Icon = useMemo(() => {
    if (region === 'World') return <GeoIconCountry country={country} />
    if (region === 'United States') return <GeoIconUsState state={country} />
    return null
  }, [country, region])
  return <CheckboxWithIcon label={country} Icon={Icon} checked={countryEnabled} setChecked={setCountryEnabled} />
}

export function ContinentCheckboxes() {
  const region = useRecoilValue(regionAtom)
  const continentNames = useRecoilValue(continentNamesAtom)
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
  const [continentEnabled, setContinentEnabled] = useRecoilState(continentAtom(continent))
  const Icon = useMemo(() => <GeoIconContinent continent={continent} />, [continent])
  return <CheckboxWithIcon label={continent} Icon={Icon} checked={continentEnabled} setChecked={setContinentEnabled} />
}
