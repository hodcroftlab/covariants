import { get } from 'lodash'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { GeoIconWrapper } from 'src/components/Common/GeoIconCommon'

export function GeoIconUsState({ state }: { state: string }) {
  const Icon = useMemo(() => {
    const stateCode = get(STATE_NAME_TO_CODE, state, '??')
    return (
      <FlagText>
        <span>{stateCode[0]}</span>
        <span>{stateCode[1]}</span>
      </FlagText>
    )
  }, [state])
  return <GeoIconWrapper>{Icon}</GeoIconWrapper>
}

const FlagText = styled.span`
  background: #fff;
  font-size: 0.75em;
  font-weight: bold;
  letter-spacing: 0.05em;
  text-align: center;
  font-family: ${(props) => props.theme.font.monospace};

  & > :first-child {
    color: #d80027;
  }

  & > :last-child {
    color: #2e52b2;
  }
`

export const STATE_NAME_TO_CODE: Record<string, string> = {
  'Alabama': 'AL',
  'Alaska': 'AK',
  'Arizona': 'AZ',
  'Arkansas': 'AR',
  'California': 'CA',
  'Colorado': 'CO',
  'Connecticut': 'CT',
  'Delaware': 'DE',
  'Florida': 'FL',
  'Georgia': 'GA',
  'Guam': 'GU',
  'Hawaii': 'HI',
  'Idaho': 'ID',
  'Illinois': 'IL',
  'Indiana': 'IN',
  'Iowa': 'IA',
  'Kansas': 'KS',
  'Kentucky': 'KY',
  'Louisiana': 'LA',
  'Maine': 'ME',
  'Maryland': 'MD',
  'Massachusetts': 'MA',
  'Michigan': 'MI',
  'Minnesota': 'MN',
  'Mississippi': 'MS',
  'Missouri': 'MO',
  'Montana': 'MT',
  'Nebraska': 'NE',
  'Nevada': 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Northern Mariana Islands': 'MP',
  'Ohio': 'OH',
  'Oklahoma': 'OK',
  'Oregon': 'OR',
  'Pennsylvania': 'PA',
  'Puerto Rico': 'PR',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  'Tennessee': 'TN',
  'Texas': 'TX',
  'USA': 'US',
  'Utah': 'UT',
  'Vermont': 'VT',
  'Virgin Islands': 'VI',
  'Virginia': 'VA',
  'Washington DC': 'DC',
  'Washington': 'WA',
  'West Virginia': 'WV',
  'Wisconsin': 'WI',
  'Wyoming': 'WY',
}
