import React, { useState } from 'react'

import { styled } from 'styled-components'

import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { Mutations, useMutationComparison } from 'src/io/useMutationComparison'
import { AminoacidMutationBadge } from 'src/components/Common/MutationBadge'
import { ToggleTwoLabels } from 'src/components/Common/ToggleTwoLabels'

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
  shared: Mutations
}

export function Variant({ variants, shared }: VariantProps) {
  return (
    <Tr>
      {shared.map((mutation, i) => (
        <Td key={`${variants[i]} ${mutation ?? ''}`}>{mutation && <AminoacidMutationBadge mutation={mutation} />}</Td>
      ))}
    </Tr>
  )
}

export function SharedMutationsTable() {
  const { t } = useTranslationSafe()

  const { data: mutationComparison } = useMutationComparison()
  const {
    variants,
    shared_by_pos: sharedByPos,
    shared_by_commonness: sharedByCommonness,
    individual: individualMutations,
  } = mutationComparison
  const nCols = variants.length

  const [byPos, setByPos] = useState(true)
  const sharedMutations = byPos ? sharedByPos : sharedByCommonness

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
          {sharedMutations.map(({ pos, presence }) => (
            <Variant key={pos} variants={variants} shared={presence} />
          ))}
        </>

        <Tr>
          <TdTitle colSpan={nCols}>{t('Other mutations')}</TdTitle>
        </Tr>

        <>
          {individualMutations.map(({ index, mutations }) => (
            <Variant key={index} variants={variants} shared={mutations} />
          ))}
        </>
      </TableBody>
    </Table>
  )
}
