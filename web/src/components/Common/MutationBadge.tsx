/* eslint-disable camelcase */
import React, { useMemo } from 'react'

import { get } from 'lodash'
import styled from 'styled-components'

import type { Mutation, MutationColors } from 'src/types'
import { theme } from 'src/theme'
import { AMINOACID_COLORS, GENE_COLORS, NUCLEOTIDE_COLORS } from 'src/colors'
import { getClusterNames, getClusters } from 'src/io/getClusters'
import { LinkSmart } from 'src/components/Link/LinkSmart'
import { parseAminoacidMutation } from 'src/components/Common/parseAminoacidMutation'
import { parseNucleotideMutation } from 'src/components/Common/parseNucleotideMutation'
import { formatMutation } from 'src/components/Common/formatMutation'

const clusters = getClusters()
const clusterNames = getClusterNames()

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

export function formatMutationMaybe(mutation: Mutation | string) {
  if (typeof mutation === 'string') {
    return mutation
  }
  return formatMutation(mutation)
}

export function aminoacidMutationToObjectAndString(mutation: Mutation | string) {
  let mutationObj: Mutation | undefined
  let mutationStr: string | undefined

  if (typeof mutation === 'string') {
    mutationObj = aminoacidMutationFromStringMaybe(mutation)
    mutationStr = mutation
  } else {
    mutationObj = mutation
    mutationStr = formatMutation(mutation)
  }

  return { mutationObj, mutationStr }
}

export function formatVariantUrl(mutation: string) {
  const cluster = clusters.find(({ display_name }) => display_name === mutation)
  if (!cluster) {
    console.warn(`Variant not recognized: ${mutation}. Known variants: ${clusterNames.join(', ')}`)
    return undefined
  }

  return `/variants/${cluster.build_name}`
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

export const LinkUnstyled = styled(LinkSmart)`
  color: unset;
  text-decoration: none;

  &:active,
  &:focus,
  &:hover {
    color: unset;
    text-decoration: none;
  }
`

export interface VariantLinkBadgeProps {
  name: Mutation | string
  href?: string
}

export function VariantLinkBadge({ name, href }: VariantLinkBadgeProps) {
  const { mutationObj, mutationStr } = useMemo(() => aminoacidMutationToObjectAndString(name), [name])
  const url = useMemo(() => href ?? formatVariantUrl(mutationStr), [href, mutationStr])

  if (!mutationObj) {
    return <span className="text-danger">{`VariantLinkBadge: Invalid mutation: ${JSON.stringify(name)}`}</span>
  }

  if (!url) {
    return (
      <span className="text-danger">
        {
          // prettier-ignore
          `VariantLinkBadge: Variant not recognized: ${JSON.stringify(name)}.` +
        `Known variants: ${clusterNames.join(', ')}`
        }
      </span>
    )
  }

  return (
    <LinkUnstyled href={url} icon={null}>
      <MutationBadge mutation={mutationObj} colors={AMINOACID_COLORS} />
    </LinkUnstyled>
  )
}

/** Shorter convenience alias for NucleotideMutationBadge */
export function NucMut({ mut }: { mut: string }) {
  return <NucleotideMutationBadge mutation={mut} />
}

/** Shorter convenience alias for AminoacidMutationBadge */
export function AaMut({ mut }: { mut: string }) {
  return <AminoacidMutationBadge mutation={mut} />
}

/** Shorter convenience alias for VariantLinkBadge */
export function Var({ name, href }: { name: string; href?: string }) {
  return <VariantLinkBadge name={name} href={href} />
}
