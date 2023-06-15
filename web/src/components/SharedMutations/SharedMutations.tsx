import React, { useMemo, useState } from 'react'

import styled from 'styled-components'

import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import type { MutationShared } from 'src/io/getMutationComparison'
import {
  getMutationComparisonVariants,
  getMutationComparisonSharedByPos,
  getMutationComparisonSharedByCommonness,
  getMutationComparisonIndividual,
} from 'src/io/getMutationComparison'
import { AminoacidMutationBadge } from 'src/components/Common/MutationBadge'
import { ToggleTwoLabels } from 'src/components/Common/ToggleTwoLabels'

const variants = getMutationComparisonVariants()
const sharedByPos = getMutationComparisonSharedByPos()
const sharedByCommonness = getMutationComparisonSharedByCommonness()
const individual = getMutationComparisonIndividual()

const Table = styled.table`
  margin: 0 auto;
`

const TableHeader = styled.thead`
  border: #7b838a solid 1px;
`

const TableBody = styled.tbody``

const Th = styled.th`
  width: 120px;
  height: 2.5rem;
  border: ${(props) => props.theme.gray500} solid 1px;
  color: ${(props) => props.theme.gray100};
  background-color: ${(props) => props.theme.gray650};
`

const Td = styled.td`
  border: ${(props) => props.theme.gray300} solid 1px;
`

const TdTitle = styled(Td)`
  color: ${(props) => props.theme.gray100};
  background-color: ${(props) => props.theme.gray650};
  height: 2.5rem;
`

const Tr = styled.tr`
  text-align: center;

  &:nth-child(odd) {
    background-color: ${(props) => props.theme.gray150};
  }
`

const AdvancedToggleWrapper = styled.div`
  flex: 0 0 100%;
  display: flex;
  transform: scale(0.8);
`

export interface VariantProps {
  variants: string[]
  shared: MutationShared
}

export function Variant({ variants, shared }: VariantProps) {
  return (
    <Tr>
      {shared.presence.map((mutation, i) => (
        <Td key={`${variants[i]} ${mutation ?? ''}`}>{mutation && <AminoacidMutationBadge mutation={mutation} />}</Td>
      ))}
    </Tr>
  )
}

export function SharedMutations() {
  const { t } = useTranslationSafe()

  const [byPos, setByPos] = useState(true)
  const shared = useMemo(() => (byPos ? sharedByPos : sharedByCommonness), [byPos])

  const nCols = variants.length

  return (
    <Table>
      <TableHeader>
        <Tr>
          {variants.map((variant) => (
            <Th key={variant}>{variant}</Th>
          ))}
        </Tr>
      </TableHeader>

      <TableBody>
        <Tr>
          <TdTitle colSpan={nCols}>
            {t('Shared mutations')}
            <AdvancedToggleWrapper>
              {t('Sort by: ')}
              <ToggleTwoLabels
                identifier="toggle-advanced-controls"
                checked={byPos}
                onCheckedChanged={setByPos}
                labelLeft={t('Position')}
                labelRight={t('Commonness')}
              />
            </AdvancedToggleWrapper>
          </TdTitle>
        </Tr>

        <>
          {shared.map((shared) => (
            <Variant key={shared.pos} variants={variants} shared={shared} />
          ))}
        </>

        <Tr>
          <TdTitle colSpan={nCols}>{t('Other mutations')}</TdTitle>
        </Tr>

        <>
          {individual.map(({ index, mutations }) => (
            <Tr key={index}>
              {mutations.map((mutation, i) => (
                <Td key={`${variants[i]} ${mutation ?? ''}`}>
                  {mutation && <AminoacidMutationBadge mutation={mutation} />}
                </Td>
              ))}
            </Tr>
          ))}
        </>
      </TableBody>
    </Table>
  )
}
