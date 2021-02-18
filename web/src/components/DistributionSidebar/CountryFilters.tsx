import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react'

import { CardBody as CardBodyBase, Form as FormBase, FormGroup as FormGroupBase, Input, Label } from 'reactstrap'
import { ColoredCircle } from 'src/components/Common/ColoredCircle'
import styled from 'styled-components'

import type { CountryState } from 'src/components/CountryDistribution/CountryDistributionPage'
import { theme } from 'src/theme'
import { getCountryColor, getCountryStrokeDashArray } from 'src/io/getCountryColor'
import { CardCollapsible } from 'src/components/Common/CardCollapsible'
import { ColoredHorizontalLineIcon } from '../Common/ColoredHorizontalLineIcon'

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
  withIcons?: boolean
  onFilterChange(country: string): void
  selectedCountry: string
  setSelectedCountry: Dispatch<SetStateAction<string>>
}

export function CountryFilterCheckbox({
  country,
  enabled,
  withIcons,
  onFilterChange,
  selectedCountry,
  setSelectedCountry,
}: CountryFilterCheckboxProps) {
  const onChange = useCallback(() => onFilterChange(country), [country, onFilterChange])

  return (
    <FormGroup check>
      <Label
        htmlFor={CSS.escape(country)}
        check
        onMouseOver={() => setSelectedCountry(country)}
        onFocus={() => setSelectedCountry(country)}
        onMouseEnter={() => setSelectedCountry(country)}
        onMouseOut={() => setSelectedCountry('')}
        onBlur={() => setSelectedCountry('')}
      >
        <Input
          id={CSS.escape(country)}
          type="checkbox"
          checked={enabled}
          onChange={onChange}
          onMouseOver={() => setSelectedCountry(country)}
          onFocus={() => setSelectedCountry(country)}
          onMouseEnter={() => setSelectedCountry(country)}
          onMouseOut={() => setSelectedCountry('')}
          onBlur={() => setSelectedCountry('')}
        />
        {withIcons ? (
          <ColoredCircle $color={getCountryColor(country)} $size={14} />
        ) : (
          <ColoredHorizontalLineIcon
            width={theme.plot.country.legend.lineIcon.width}
            height={theme.plot.country.legend.lineIcon.height}
            stroke={getCountryColor(country)}
            strokeWidth={theme.plot.country.legend.lineIcon.thickness}
            strokeDasharray={getCountryStrokeDashArray(country)}
          />
        )}
        <span className="ml-2" style={{ fontWeight: country === selectedCountry ? 'bold' : 'normal' }}>
          {country}
        </span>
      </Label>
    </FormGroup>
  )
}

export interface CountryFiltersProps {
  countries: CountryState
  collapsed: boolean
  withIcons?: boolean
  onFilterChange(country: string): void
  setCollapsed(collapsed: boolean): void
  selectedCountry: string
  setSelectedCountry: Dispatch<SetStateAction<string>>
}

export function CountryFilters({
  countries,
  collapsed,
  withIcons,
  onFilterChange,
  setCollapsed,
  selectedCountry,
  setSelectedCountry,
}: CountryFiltersProps) {
  const filters = useMemo(() => Object.entries(countries), [countries])

  return (
    <CardCollapsible className="m-2" title={'Countries'} collapsed={collapsed} setCollapsed={setCollapsed}>
      <CardBody>
        <Form>
          {filters.map(([country, { enabled }]) => (
            <CountryFilterCheckbox
              key={country}
              country={country}
              enabled={enabled}
              withIcons={withIcons}
              onFilterChange={onFilterChange}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          ))}
        </Form>
      </CardBody>
    </CardCollapsible>
  )
}
