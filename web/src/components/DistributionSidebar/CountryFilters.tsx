/* eslint-disable sonarjs/no-identical-functions */
import React, { useCallback, useMemo } from 'react'

import { CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'

import { getCountryColor } from 'src/io/getCountryColor'
import { ColoredCircle } from 'src/components/Common/ColoredCircle'
import type { CountryState } from 'src/components/CountryDistribution/CountryDistributionPage'

export interface CountryFilterCheckboxProps {
  country: string
  enabled: boolean
  onFilterChange(country: string): void
}

export function CountryFilterCheckbox({ country, enabled, onFilterChange }: CountryFilterCheckboxProps) {
  const onChange = useCallback(() => onFilterChange(country), [country, onFilterChange])

  return (
    <FormGroup check>
      <Label htmlFor={CSS.escape(country)} check>
        <Input id={CSS.escape(country)} type="checkbox" checked={enabled} onChange={onChange} />
        <ColoredCircle $color={getCountryColor(country)} $size={14} />
        <span>{country}</span>
      </Label>
    </FormGroup>
  )
}

export interface CountryFiltersProps {
  countries: CountryState
  onFilterChange(country: string): void
}

export function CountryFilters({ countries, onFilterChange }: CountryFiltersProps) {
  const numCountries = useMemo(() => Object.keys(countries).length, [countries])
  const firstHalf = useMemo(() => Object.entries(countries).slice(0, numCountries / 2), [countries, numCountries])
  const secondHalf = useMemo(() => Object.entries(countries).slice(numCountries / 2), [countries, numCountries])

  return (
    <CardBody>
      <Row noGutters>
        <Col xl={6}>
          <Form>
            {firstHalf.map(([country, { enabled }]) => (
              <CountryFilterCheckbox
                key={country}
                country={country}
                enabled={enabled}
                onFilterChange={onFilterChange}
              />
            ))}
          </Form>
        </Col>

        <Col xl={6}>
          <Form>
            {secondHalf.map(([country, { enabled }]) => (
              <CountryFilterCheckbox
                key={country}
                country={country}
                enabled={enabled}
                onFilterChange={onFilterChange}
              />
            ))}
          </Form>
        </Col>
      </Row>
    </CardBody>
  )
}
