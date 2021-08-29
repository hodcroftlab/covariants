import React, { SVGProps } from 'react'
import styled from 'styled-components'
import States from 'us-state-codes'

import { FlagOutline } from './FlagOutline'

const FlagText = styled.span`
  align-items: center;
  background: #fff;
  display: flex;
  font-size: 0.75em;
  font-weight: bold;
  justify-content: center;

  & > :last-child {
    color: #2e52b2;
  }
  & > :first-child {
    color: #d80027;
  }
`

export const missingCodes: Record<string, string> = {
  'USA': 'US',
  'Washington DC': 'DC',
  'Guam': 'GU',
  'Virgin Islands': 'VI',
}

export interface USStateCodeProps extends SVGProps<SVGSVGElement> {
  country: string
  state?: string
  withFallback?: boolean
}

export function USStateCode({ country, state = country, withFallback = false }: USStateCodeProps) {
  const stateCode = missingCodes[state] ?? States.getStateCodeByStateName(state)

  const fallback = withFallback ? <FlagOutline $missingCode={stateCode} /> : null
  return stateCode ? (
    <FlagOutline>
      <FlagText>
        <span>{stateCode[0]}</span>
        <span>{stateCode[1]}</span>
      </FlagText>
    </FlagOutline>
  ) : (
    fallback
  )
}
