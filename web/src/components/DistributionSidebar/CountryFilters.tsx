import React, { useCallback, useMemo } from 'react'

import { CardBody as CardBodyBase, Form as FormBase, FormGroup as FormGroupBase, Input, Label } from 'reactstrap'
import styled from 'styled-components'

import type { CountryState } from 'src/components/CountryDistribution/CountryDistributionPage'
import { getCountryColor } from 'src/io/getCountryColor'
import { ColoredCircle } from 'src/components/Common/ColoredCircle'
import { CardCollapsible } from 'src/components/Common/CardCollapsible'

export const CardBody = styled(CardBodyBase)``

export const FormGroup = styled(FormGroupBase)`
  flex: 1 0 265px;
`

export const Form = styled(FormBase)`
  display: flex;
  flex-wrap: wrap;
`

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
