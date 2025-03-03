import get from 'lodash/get'
import React from 'react'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { AMINOACID_NAMES, GENE_NAMES } from 'src/names'
import { AMINOACID_COLORS } from 'src/colors'
import { MutationBadge } from 'src/components/Common/Badges/MutationBadge'
import type { Mutation } from 'src/types'
import { parseAminoacidMutation } from 'src/components/Common/parseAminoacidMutation'

export function AminoacidMutationBadge({ mutation }: AminoacidMutationBadgeProps) {
  const { t } = useTranslationSafe()

  const mutationObj = aminoacidMutationFromStringMaybe(mutation)
  if (!mutationObj) {
    return <span>{`Invalid mutation: '${JSON.stringify(mutation)}'`}</span>
  }

  const { gene, left, pos, right } = mutationObj
  const wildTypeAA = get(AMINOACID_NAMES, left ?? '', '')
  const variantAA = right ? get(AMINOACID_NAMES, right, '') : 'one of several alternatives'
  const geneName = gene ? get(GENE_NAMES, gene, gene) : ''
  const posStr = pos ?? ''
  const tooltip = t('Mutation of amino acid at position {{pos}} in {{gene}} from {{ref}} to {{qry}}', {
    pos: posStr,
    gene: geneName,
    ref: wildTypeAA,
    qry: variantAA,
  })

  return <MutationBadge mutation={mutationObj} colors={AMINOACID_COLORS} tooltip={tooltip} />
}

export interface AminoacidMutationBadgeProps {
  mutation: Mutation | string
}

export function aminoacidMutationFromStringMaybe(mutation: Mutation | string): Mutation | undefined {
  if (typeof mutation === 'string') {
    return parseAminoacidMutation(mutation)
  }
  return mutation
}

/** Shorter convenience alias for AminoacidMutationBadge */
export function AaMut({ mut }: { mut: string }) {
  return <AminoacidMutationBadge mutation={mut} />
}
