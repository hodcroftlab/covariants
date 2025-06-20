import React, { useCallback, useMemo } from 'react'

import {
  Button,
  CardBody as CardBodyBase,
  Col,
  Container,
  Form as FormBase,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap'
import { styled, useTheme } from 'styled-components'
import { useRecoilValue } from 'recoil'
import { PrimitiveAtom, useAtom } from 'jotai'
import { ColoredHorizontalLineIcon } from '../Common/ColoredHorizontalLineIcon'
import { Continent, Country } from 'src/state/Places'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import type { CountryFlagProps } from 'src/components/Common/CountryFlag'
import { CardCollapsible } from 'src/components/Common/CardCollapsible'
import { getCountryStylesSelector } from 'src/state/CountryStyles'

export const CardBody = styled(CardBodyBase)``

export const Form = styled(FormBase)`
  display: flex;
  flex-direction: column;
`

const FlagAlignment = styled.span`
  display: inline-flex;
  align-items: baseline;
  margin-left: 0.25em;

  > * + * {
    margin-left: 0.5em;
  }
`

export interface IconOrLineComponentProps {
  country: string
  Icon?: React.ComponentType<CountryFlagProps>
}

export function IconComponent({ country, Icon }: IconOrLineComponentProps) {
  const { t } = useTranslationSafe()
  return (
    <FlagAlignment>
      {Icon && <Icon country={country} withFallback />}
      <span>{t(country)}</span>
    </FlagAlignment>
  )
}

export function LineComponent({ country }: IconOrLineComponentProps) {
  const { t } = useTranslationSafe()
  const theme = useTheme()
  const getCountryStyles = useRecoilValue(getCountryStylesSelector)
  const { color: stroke, strokeDashArray: strokeDasharray } = getCountryStyles(country)

  return (
    <>
      <ColoredHorizontalLineIcon
        className={'align-self-start'}
        width={theme.plot.country.legend.lineIcon.width}
        height={theme.plot.country.legend.lineIcon.height}
        stroke={stroke}
        strokeWidth={theme.plot.country.legend.lineIcon.thickness}
        strokeDasharray={strokeDasharray}
      />
      <span>{t(country)}</span>
    </>
  )
}

export interface CountryFilterCheckboxProps {
  country: string
  enabled: boolean
  withIcons?: boolean
  Icon?: React.ComponentType<CountryFlagProps>
  onFilterChange(country: string): void
}

export function CountryFilterCheckbox({
  country,
  enabled,
  withIcons,
  Icon,
  onFilterChange,
}: CountryFilterCheckboxProps) {
  const onChange = useCallback(() => onFilterChange(country), [country, onFilterChange])
  const IconOrLine = useMemo(() => (withIcons ? IconComponent : LineComponent), [withIcons])

  return (
    <FormGroup check>
      <Label className={'d-flex align-items-baseline gap-2'} check>
        <Input type="checkbox" checked={enabled} onChange={onChange} />
        <IconOrLine Icon={Icon} country={country} />
      </Label>
    </FormGroup>
  )
}

export interface CountryFiltersProps {
  countries: Country[]
  continents: Continent[]
  regionsTitle: string
  withIcons?: boolean
  Icon?: React.ComponentType<CountryFlagProps>
  onFilterChange(country: string): void
  onFilterSelectRegion(regionName: string): void
  onFilterSelectAll(): void
  onFilterDeselectAll(): void
  collapsedAtom: PrimitiveAtom<boolean>
}

export function CountryFilters({
  countries,
  continents,
  regionsTitle,
  withIcons,
  Icon,
  onFilterSelectRegion,
  onFilterSelectAll,
  onFilterDeselectAll,
  onFilterChange,
  collapsedAtom,
}: CountryFiltersProps) {
  const { t } = useTranslationSafe()
  const [collapsed, setCollapsed] = useAtom(collapsedAtom)

  const handleContinentChange = useCallback(
    (continent: string) => onFilterSelectRegion(continent),
    [onFilterSelectRegion],
  )

  const continentCheckboxes = useMemo(
    () =>
      continents.map(({ continent, enabled }) => {
        return (
          <CountryFilterCheckbox
            key={continent}
            country={continent}
            enabled={enabled}
            withIcons
            Icon={Icon}
            onFilterChange={handleContinentChange}
          />
        )
      }),
    [Icon, continents, handleContinentChange],
  )

  const countryCheckboxes = useMemo(
    () =>
      countries.map(({ country, enabled }) => (
        <CountryFilterCheckbox
          key={country}
          country={country}
          enabled={enabled}
          withIcons={withIcons}
          Icon={Icon}
          onFilterChange={onFilterChange}
        />
      )),
    [Icon, countries, onFilterChange, withIcons],
  )

  return (
    <CardCollapsible title={regionsTitle} collapsed={collapsed} setCollapsed={setCollapsed}>
      <CardBody>
        <Container fluid>
          <Row className={'gx-0'}>
            <Col className="d-flex">
              <FormGroup className="flex-grow-0 mx-auto">
                <Button type="button" color="link" onClick={onFilterSelectAll}>
                  {t('Select all')}
                </Button>
                <Button type="button" color="link" onClick={onFilterDeselectAll}>
                  {t('Deselect all')}
                </Button>
              </FormGroup>
            </Col>
          </Row>

          {continents.length > 1 && (
            <Row className="pb-3 pt-3 border-bottom border-top gx-0">
              <Col className="d-flex">
                <Form>{continentCheckboxes}</Form>
              </Col>
            </Row>
          )}

          <Row className="mt-3 gx-0">
            <Col>
              <Form>{countryCheckboxes}</Form>
            </Col>
          </Row>
        </Container>
      </CardBody>
    </CardCollapsible>
  )
}
