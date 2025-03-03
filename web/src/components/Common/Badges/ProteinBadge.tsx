import React, { useMemo } from 'react'
import get from 'lodash/get'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { GENE_COLORS } from 'src/colors'
import { GeneText, MutationBadgeBox, MutationWrapper } from 'src/components/Common/Badges/MutationBadge'
import { theme } from 'src/theme'

const DEFAULT_COLOR = theme.gray700

export function ProteinBadge({ gene, ...rest }: ProteinBadgeProps) {
  const { t } = useTranslationSafe()

  const { tooltip, geneColor } = useMemo(
    () => ({
      tooltip: t('Protein {{geneName}}', { geneName: gene }),
      geneColor: get(GENE_COLORS, gene ?? '', DEFAULT_COLOR),
    }),
    [gene, t],
  )
  return (
    <MutationBadgeBox title={tooltip} {...rest}>
      <MutationWrapper>
        <GeneText $color={geneColor}>{gene}</GeneText>
      </MutationWrapper>
    </MutationBadgeBox>
  )
}

export interface ProteinBadgeProps {
  gene: string
}
