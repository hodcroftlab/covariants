import React, { useCallback, useMemo } from 'react'

import { CardBody, Form, FormGroup, Input, Label } from 'reactstrap'
import { CardCollapsible } from 'src/components/Common/CardCollapsible'

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
  collapsed: boolean
  onFilterChange(country: string): void
  setCollapsed(collapsed: boolean): void
}

export function CountryFilters({ countries, collapsed, onFilterChange, setCollapsed }: CountryFiltersProps) {
  const filters = useMemo(() => Object.entries(countries), [countries])

  return (
    <CardCollapsible className="m-2" title={'Countries'} collapsed={collapsed} setCollapsed={setCollapsed}>
      <CardBody>
        <Form>
          {filters.map(([country, { enabled }]) => (
            <CountryFilterCheckbox key={country} country={country} enabled={enabled} onFilterChange={onFilterChange} />
          ))}
        </Form>
      </CardBody>
    </CardCollapsible>
  )
}
