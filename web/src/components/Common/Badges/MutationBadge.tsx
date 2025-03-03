import React from 'react'

import get from 'lodash/get'
import { styled } from 'styled-components'

import type { Mutation, MutationColors } from 'src/types'
import { theme } from 'src/theme'
import { CLADE_COLORS, GENE_COLORS } from 'src/colors'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'

export function MutationBadge({ prefix, mutation, colors, tooltip }: MutationBadgeProps) {
  const { t } = useTranslationSafe()
  const { parent, parentDelimiter, gene, left, pos, right, version, note } = mutation

  const parentColors = get(CLADE_COLORS, parent ?? '', { bg: DEFAULT_COLOR, fg: DEFAULT_TEXT_COLOR })
  const geneColor = get(GENE_COLORS, gene ?? '', DEFAULT_COLOR)
  const leftColor = get(colors, left ?? '', DEFAULT_COLOR)
  const rightColor = get(colors, right ?? '', DEFAULT_COLOR)

  const parentDelimiterStr = parentDelimiter ?? ''

  return (
    <MutationBadgeBox title={tooltip}>
      <MutationWrapper>
        {prefix && <PrefixText>{t(prefix)}</PrefixText>}
        {parent && (
          <ParentText
            $backgroundColor={parentColors.bg}
            $color={parentColors.fg}
          >{`${parent}${parentDelimiterStr}`}</ParentText>
        )}
        {gene && (
          <GeneText $color={geneColor}>
            {gene}
            <span>{':'}</span>
          </GeneText>
        )}
        {left && <ColoredText $color={leftColor}>{left}</ColoredText>}
        {pos && <PositionText>{pos}</PositionText>}
        {right && <ColoredText $color={rightColor}>{right}</ColoredText>}
        {version && <VersionText>{version}</VersionText>}
      </MutationWrapper>
      {note && <span>{note}</span>}
    </MutationBadgeBox>
  )
}

export interface MutationBadgeProps {
  prefix?: string
  mutation: Mutation
  colors: MutationColors
  tooltip?: string
}

const DEFAULT_COLOR = theme.gray700
const DEFAULT_TEXT_COLOR = theme.gray100

export const MutationBadgeBox = styled.span`
  display: inline-block;
  font-size: 0.75rem;
`

export const MutationWrapper = styled.span`
  border-radius: 2px;
  box-shadow: ${(props) => props.theme.shadows.lighter};

  font-family: ${(props) => props.theme.font.monospace};

  & > span:first-child {
    padding-left: 4px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  & > span:last-child {
    padding-right: 4px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`

export const PrefixText = styled.span`
  padding: 1px 5px;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.gray550};
`

export const ParentText = styled.span<{ $backgroundColor: string; $color: string }>`
  padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 5px;
  padding-right: 1px;
  color: ${(props) => props.$color};
  background-color: ${(props) => props.$backgroundColor};
`

export const ColoredText = styled.span<{ $color: string }>`
  padding: 1px 2px;
  background-color: ${(props) => props.$color};
`

export const PositionText = styled.span`
  padding: 1px 2px;
  background-color: ${(props) => props.theme.gray300};
  color: ${(props) => props.theme.gray800};
`

export const VersionText = styled.span`
  padding: 1px 2px;
  background-color: ${(props) => props.theme.gray400};
  color: ${(props) => props.theme.gray800};
`

export const GeneText = styled.span<{ $color: string }>`
  padding: 1px 2px;
  background-color: ${(props) => props.$color};
  color: ${(props) => props.theme.gray100};
  font-weight: 700;
`
