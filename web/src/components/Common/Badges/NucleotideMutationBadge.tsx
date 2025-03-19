import get from 'lodash/get'
import React from 'react'
import type { Mutation } from 'src/types'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { NUCELOTIDE_NAMES } from 'src/names'
import { NUCLEOTIDE_COLORS } from 'src/colors'
import { MutationBadge } from 'src/components/Common/Badges/MutationBadge'
import { parseNucleotideMutation } from 'src/components/Common/parseNucleotideMutation'

export function NucleotideMutationBadge({ mutation }: NucleotideMutationBadgeProps) {
  const { t } = useTranslationSafe()

  const mutationObj = nucleotideMutationFromStringMaybe(mutation)
  if (!mutationObj) {
    return <span>{`Invalid mutation: '${JSON.stringify(mutation)}'`}</span>
  }

  const { left, right, pos } = mutationObj
  const wildTypeBase = get(NUCELOTIDE_NAMES, left ?? '', '')
  const variantBase = get(NUCELOTIDE_NAMES, right ?? '', '')
  const posStr = pos ?? ''
  const tooltip = t('Mutation of nucleotide at position {{pos}} from {{ref}} to {{qry}}', {
    pos: posStr,
    ref: wildTypeBase,
    qry: variantBase,
  })

  return <MutationBadge mutation={mutationObj} colors={NUCLEOTIDE_COLORS} tooltip={tooltip} />
}

export interface NucleotideMutationBadgeProps {
  mutation: Mutation | string
}

export function nucleotideMutationFromStringMaybe(mutation: Mutation | string): Mutation | undefined {
  if (typeof mutation === 'string') {
    return parseNucleotideMutation(mutation)
  }
  return mutation
}

/** Shorter convenience alias for NucleotideMutationBadge */
export function NucMut({ mut }: { mut: string }) {
  return <NucleotideMutationBadge mutation={mut} />
}
