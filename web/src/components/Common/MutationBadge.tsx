import React from 'react'

import { get } from 'lodash'
import styled from 'styled-components'

import type { MutationColors, Mutation } from 'src/types'
import { theme } from 'src/theme'

const DEFAULT_COLOR = theme.gray700

export const GENE_COLORS = {
  E: '#60AA9E',
  M: '#D9AD3D',
  N: '#5097BA',
  ORF10: '#E67030',
  ORF14: '#8EBC66',
  ORF1a: '#E59637',
  ORF1b: '#AABD52',
  ORF3a: '#FF9B80',
  ORF6: '#5097BA',
  ORF7a: '#C4B945',
  ORF7b: '#75B681',
  ORF8: '#60AA9E',
  ORF9b: '#D9AD3D',
  S: '#DF4327',
}

export const NUCLEOTIDE_COLORS = {
  'A': '#47FF19',
  'T': '#61A3F3',
  'G': '#FFD63F',
  'C': '#F68272',
  'U': '#8A89FF',
  'R': '#FFFE80',
  'Y': '#E180FF',
  'S': '#FF9B80',
  'W': '#80FFF2',
  'M': '#CE8834',
  'K': '#90B82C',
  'D': '#C7FFB9',
  'B': '#F8C1C0',
  'V': '#FFE3B9',
  'H': '#BFD8F9',
  'N': '#222222',
  'X': '#222222',
  '-': '#222222',
}

export const AMINOACID_COLORS = {
  A: '#80A0F0',
  R: '#F01505',
  N: '#00FF00',
  D: '#C048C0',
  C: '#F08080',
  Q: '#00FF00',
  E: '#C048C0',
  G: '#F09048',
  H: '#15A4A4',
  I: '#80A0F0',
  L: '#80A0F0',
  K: '#F01505',
  M: '#80A0F0',
  F: '#80A0F0',
  P: '#FFFF00',
  S: '#00FF00',
  T: '#00FF00',
  W: '#80A0F0',
  Y: '#15A4A4',
  V: '#80A0F0',
  B: '#222222',
  X: '#222222',
  Z: '#222222',
}

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
