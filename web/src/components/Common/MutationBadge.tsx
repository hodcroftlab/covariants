import { get } from 'lodash'
import React from 'react'

import type { Mutation, MutationColors } from 'src/types'
import { theme } from 'src/theme'
import { AMINOACID_COLORS, GENE_COLORS, NUCLEOTIDE_COLORS } from 'src/colors'
import styled from 'styled-components'

const DEFAULT_COLOR = theme.gray700

export const MutationBadgeBox = styled.div`
  display: inline-block;
  padding: 2px 0;
  margin: 5px 5px;
`

export const MutationWrapper = styled.span`
  height: 1.8rem;

  border-radius: 3px;
  box-shadow: ${(props) => props.theme.shadows.slight};

  font-size: 0.85rem;
  font-family: ${(props) => props.theme.font.monospace};

  & > span:first-child {
    padding-left: 8px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  & > span:last-child {
    padding-right: 6px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`

export const GeneText = styled.span<{ $color: string }>`
  padding: 2px 5px;
  background-color: ${(props) => props.$color};
  color: ${(props) => props.theme.gray100};
  font-weight: 700;
`

export const ColoredText = styled.span<{ $color: string }>`
  padding: 2px 5px;
  background-color: ${(props) => props.$color};
`

export const PositionText = styled.span`
  padding: 2px 2px;
  background-color: ${(props) => props.theme.gray300};
  color: ${(props) => props.theme.gray800};
`

export interface MutationBadgeProps {
  mutation: Mutation
  colors: MutationColors
}

export function MutationBadge({ mutation, colors }: MutationBadgeProps) {
  const { gene, left, pos, right, note } = mutation

  const geneColor = get(GENE_COLORS, gene ?? '', DEFAULT_COLOR)
  const leftColor = get(colors, left, DEFAULT_COLOR)
  const rightColor = get(colors, right, DEFAULT_COLOR)

  return (
    <MutationBadgeBox>
      <MutationWrapper>
        {gene && (
          <>
            <GeneText $color={geneColor}>
              {gene}
              <span>{':'}</span>
            </GeneText>
          </>
        )}
        <ColoredText $color={leftColor}>{left}</ColoredText>
        <PositionText>{pos}</PositionText>
        <ColoredText $color={rightColor}>{right}</ColoredText>
      </MutationWrapper>
      {note && <span>{note}</span>}
    </MutationBadgeBox>
  )
}

export interface NucleotideMutationBadgeProps {
  mutation: Mutation
}

export function NucleotideMutationBadge({ mutation }: NucleotideMutationBadgeProps) {
  return <MutationBadge mutation={mutation} colors={NUCLEOTIDE_COLORS} />
}

export interface AminoacidMutationBadgeProps {
  mutation: Mutation
}

export function AminoacidMutationBadge({ mutation }: AminoacidMutationBadgeProps) {
  return <MutationBadge mutation={mutation} colors={AMINOACID_COLORS} />
}
