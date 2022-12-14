import React, { useMemo } from 'react'
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
    if (region === 'World') return <CountryFlagIcon country={country} />
    if (region === 'United States') return <UsStateCodeIcon state={country} />
    return null
  }, [country, region])
  return <CheckboxWithIcon label={country} Icon={Icon} checked={countryEnabled} setChecked={setCountryEnabled} />
}

export function CountryFlagIcon({ country: _ }: { country: string }) {
  return null
}

export function UsStateCodeIcon({ state: _ }: { state: string }) {
  return null
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
  const Icon = useMemo(() => <ContinentIcon continent={continent} />, [continent])
  return <CheckboxWithIcon label={continent} Icon={Icon} checked={continentEnabled} setChecked={setContinentEnabled} />
}

export function ContinentIcon({ continent: _ }: { continent: string }) {
  return null
}

// import React, { useCallback, useMemo } from 'react'
//
// import {
//   Button,
//   CardBody as CardBodyBase,
//   Col,
//   Container,
//   Form as FormBase,
//   FormGroup as FormGroupBase,
//   Input,
//   Label,
//   Row,
// } from 'reactstrap'
// import { Continent, Country } from 'src/state/Places'
// import styled, { useTheme } from 'styled-components'
//
// import type { CountryFlagProps } from 'src/components/Common/CountryFlag'
// import { getCountryColor, getCountryStrokeDashArray } from 'src/io/getCountryColor'
// import { CardCollapsible } from 'src/components/Common/CardCollapsible'
// import { ColoredHorizontalLineIcon } from '../Common/ColoredHorizontalLineIcon'
//
// export const CardBody = styled(CardBodyBase)``
//
// export const FormGroup = styled(FormGroupBase)`
//   flex: 1 0 320px;
// `
//
// export const Form = styled(FormBase)`
//   display: flex;
//   flex-wrap: wrap;
// `
//
// const FlagAlignment = styled.span`
//   display: inline-flex;
//   align-items: center;
//   margin-left: 0.25em;
//   > * + * {
//     margin-left: 0.5em;
//   }
// `
//
// export interface IconOrLineComponentProps {
//   country: string
//   Icon?: React.ComponentType<CountryFlagProps>
// }
//
// export function IconComponent({ country, Icon }: IconOrLineComponentProps) {
//   return (
//     <FlagAlignment>
//       {Icon && <Icon country={country} withFallback />}
//       <span>{country}</span>
//     </FlagAlignment>
//   )
// }
// export function LineComponent({ country }: IconOrLineComponentProps) {
//   const theme = useTheme()
//   const { stroke, strokeDasharray } = useMemo(() => {
//     return {
//       stroke: getCountryColor(country),
//       strokeDasharray: getCountryStrokeDashArray(country),
//     }
//   }, [country])
//
//   return (
//     <>
//       <ColoredHorizontalLineIcon
//         width={theme.plot.country.legend.lineIcon.width}
//         height={theme.plot.country.legend.lineIcon.height}
//         stroke={stroke}
//         strokeWidth={theme.plot.country.legend.lineIcon.thickness}
//         strokeDasharray={strokeDasharray}
//       />
//       <span className="ml-2">{country}</span>
//     </>
//   )
// }
//
// export interface CountryFilterCheckboxProps {
//   country: string
//   enabled: boolean
//   withIcons?: boolean
//   Icon?: React.ComponentType<CountryFlagProps>
//   onFilterChange(country: string): void
// }
//
// export function CountryFilterCheckbox({
//   country,
//   enabled,
//   withIcons,
//   Icon,
//   onFilterChange,
// }: CountryFilterCheckboxProps) {
//   const onChange = useCallback(() => onFilterChange(country), [country, onFilterChange])
//   const IconOrLine = useMemo(() => (withIcons ? IconComponent : LineComponent), [withIcons])
//
//   return (
//     <FormGroup check>
//       <Label htmlFor={CSS.escape(country)} check>
//         <Input id={CSS.escape(country)} type="checkbox" checked={enabled} onChange={onChange} />
//         <IconOrLine Icon={Icon} country={country} />
//       </Label>
//     </FormGroup>
//   )
// }
//
// export interface CountryFiltersProps {
//   countries: Country[]
//   continents: Continent[]
//   regionsTitle: string
//   collapsed: boolean
//   withIcons?: boolean
//   Icon?: React.ComponentType<CountryFlagProps>
//   onFilterChange(country: string): void
//   onFilterSelectRegion(regionName: string): void
//   onFilterSelectAll(): void
//   onFilterDeselectAll(): void
//   setCollapsed(collapsed: boolean): void
// }
//
// export function CountryFilters({
//   countries,
//   continents,
//   regionsTitle,
//   collapsed,
//   withIcons,
//   Icon,
//   onFilterSelectRegion,
//   onFilterSelectAll,
//   onFilterDeselectAll,
//   onFilterChange,
//   setCollapsed,
// }: CountryFiltersProps) {
//   const handleContinentChange = useCallback(
//     (continent: string) => onFilterSelectRegion(continent),
//     [onFilterSelectRegion],
//   )
//
//   const continentCheckboxes = useMemo(
//     () =>
//       continents.map(({ continent, enabled }) => {
//         return (
//           <CountryFilterCheckbox
//             key={continent}
//             country={continent}
//             enabled={enabled}
//             withIcons
//             Icon={Icon}
//             onFilterChange={handleContinentChange}
//           />
//         )
//       }),
//     [Icon, continents, handleContinentChange],
//   )
//
//   const countryCheckboxes = useMemo(
//     () =>
//       countries.map(({ country, enabled }) => (
//         <CountryFilterCheckbox
//           key={country}
//           country={country}
//           enabled={enabled}
//           withIcons={withIcons}
//           Icon={Icon}
//           onFilterChange={onFilterChange}
//         />
//       )),
//     [Icon, countries, onFilterChange, withIcons],
//   )
//
//   return (
//     <CardCollapsible className="m-2" title={regionsTitle} collapsed={collapsed} setCollapsed={setCollapsed}>
//       <CardBody>
//         <Container fluid>
//           <Row noGutters>
//             <Col className="d-flex">
//               <FormGroup className="flex-grow-0 mx-auto">
//                 <Button type="button" color="link" onClick={onFilterSelectAll}>
//                   {'Select all'}
//                 </Button>
//                 <Button type="button" color="link" onClick={onFilterDeselectAll}>
//                   {'Deselect all'}
//                 </Button>
//               </FormGroup>
//             </Col>
//           </Row>
//
//           {continents.length > 1 && (
//             <Row noGutters className="pb-3 pt-3 border-bottom border-top">
//               <Col className="d-flex">
//                 <Form>{continentCheckboxes}</Form>
//               </Col>
//             </Row>
//           )}
//
//           <Row noGutters className="mt-3">
//             <Col>
//               <Form>{countryCheckboxes}</Form>
//             </Col>
//           </Row>
//         </Container>
//       </CardBody>
//     </CardCollapsible>
//   )
// }
