import React from 'react'

import { get } from 'lodash'
import styled from 'styled-components'

import type { Mutation, MutationColors } from 'src/types'
import { theme } from 'src/theme'
import { AMINOACID_COLORS, GENE_COLORS, NUCLEOTIDE_COLORS } from 'src/colors'
import { parseAminoacidMutation } from 'src/components/Common/parseAminoacidMutation'
import { parseNucleotideMutation } from 'src/components/Common/parseNucleotideMutation'

const DEFAULT_COLOR = theme.gray700

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

export const GeneText = styled.span<{ $color: string }>`
  padding: 1px 2px;
  background-color: ${(props) => props.$color};
  color: ${(props) => props.theme.gray100};
  font-weight: 700;
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

export function nucleotideMutationFromStringMaybe(mutation: Mutation | string): Mutation | undefined {
  if (typeof mutation === 'string') {
    return parseNucleotideMutation(mutation)
  }
  return mutation
}

export function aminoacidMutationFromStringMaybe(mutation: Mutation | string): Mutation | undefined {
  if (typeof mutation === 'string') {
    return parseAminoacidMutation(mutation)
  }
  return mutation
}

export interface MutationBadgeProps {
  mutation: Mutation
  colors: MutationColors
}

export function MutationBadge({ mutation, colors }: MutationBadgeProps) {
  const { gene, left, pos, right, note } = mutation

  const geneColor = get(GENE_COLORS, gene ?? '', DEFAULT_COLOR)
  const leftColor = get(colors, left ?? '', DEFAULT_COLOR)
  const rightColor = get(colors, right ?? '', DEFAULT_COLOR)

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
        {left && <ColoredText $color={leftColor}>{left}</ColoredText>}
        <PositionText>{pos}</PositionText>
        {right && <ColoredText $color={rightColor}>{right}</ColoredText>}
      </MutationWrapper>
      {note && <span>{note}</span>}
    </MutationBadgeBox>
  )
}

export interface NucleotideMutationBadgeProps {
  mutation: Mutation | string
}

export function NucleotideMutationBadge({ mutation }: NucleotideMutationBadgeProps) {
  const mutationObj = nucleotideMutationFromStringMaybe(mutation)
  if (!mutationObj) {
    return <span>{`Invalid mutation: '${JSON.stringify(mutation)}'`}</span>
  }

  return <MutationBadge mutation={mutationObj} colors={NUCLEOTIDE_COLORS} />
}

export interface AminoacidMutationBadgeProps {
  mutation: Mutation | string
}

export function AminoacidMutationBadge({ mutation }: AminoacidMutationBadgeProps) {
  const mutationObj = aminoacidMutationFromStringMaybe(mutation)
  if (!mutationObj) {
    return <span>{`Invalid mutation: '${JSON.stringify(mutation)}'`}</span>
  }

  return <MutationBadge mutation={mutationObj} colors={AMINOACID_COLORS} />
}
