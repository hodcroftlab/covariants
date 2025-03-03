import get from 'lodash/get'
import React, { useMemo } from 'react'
import { styled } from 'styled-components'
import { rainbow } from 'src/helpers/colorRainbow'
import { GREEK_ALPHABET } from 'src/names'
import { theme } from 'src/theme'
import { MutationBadgeBox, MutationWrapper, PrefixText } from 'src/components/Common/Badges/MutationBadge'
import { LinkUnstyled } from 'src/components/Common/Badges/LineageBadge'

export function WhoBadge({ name, href, prefix }: WhoBadgeProps) {
  const letter = get(GREEK_ALPHABET, name.toLowerCase().trim(), '')
  const tooltip = useMemo(() => `WHO Label: ${letter} (${name})`, [letter, name])

  const color = getWhoBadgeColor(name)

  return (
    <LinkUnstyled href={href}>
      <MutationBadgeBox title={tooltip}>
        <MutationWrapper>
          {prefix && <PrefixText>{prefix}</PrefixText>}
          {letter && <LetterText>{letter}</LetterText>}
          <WhoText className="pl-1" $color={color}>
            {name}
          </WhoText>
        </MutationWrapper>
      </MutationBadgeBox>
    </LinkUnstyled>
  )
}

export interface WhoBadgeProps {
  name: string
  href?: string
  prefix?: string
}

const whoRainbow = rainbow(Object.keys(GREEK_ALPHABET).length, { rgb: true, lum: 75, sat: 75 })

export function getWhoBadgeColor(name: string): string {
  const i = Object.keys(GREEK_ALPHABET).indexOf(name.toLowerCase().trim())

  if (i === -1 || i > whoRainbow.length) {
    return theme.gray500
  }
  return whoRainbow[i]
}

export const LetterText = styled.span`
  padding: 1px 5px;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.gray700};
`

export const WhoText = styled.span<{ $color: string }>`
  padding: 1px 5px;
  background-color: ${(props) => props.$color};
`

/** Shorter convenience alias for WhoBadge */
export function Who({ name, href, prefix = '' }: WhoBadgeProps) {
  return <WhoBadge name={name} href={href} prefix={prefix} />
}
