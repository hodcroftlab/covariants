import React, { useState } from 'react'

import { styled } from 'styled-components'

import { useRecoilValue } from 'recoil'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { Mutations } from 'src/io/getMutationComparison'
import { ToggleTwoLabels } from 'src/components/Common/ToggleTwoLabels'
import { AminoacidMutationBadge } from 'src/components/Common/Badges/AminoacidMutationBadge'
import { enablePangolinAtom } from 'src/state/Nomenclature'
import { mutationComparisonAtom } from 'src/state/MutationComparison'

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
  justify-content: center;
  transform: scale(0.8);
  gap: 0.25rem;
`

const PositionToggle = styled(ToggleTwoLabels)`
  margin: 0;
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
  const enablePangolin = useRecoilValue(enablePangolinAtom)

  const { variants, sharedByPos, sharedByCommonness, individualMutations } = useRecoilValue(mutationComparisonAtom)
  const variantsNames = variants.map((v) => (enablePangolin ? v.pangolin : v.nextstrain))
  const nCols = variants.length

  const [byPos, setByPos] = useState(true)
  const sharedMutations = byPos ? sharedByPos : sharedByCommonness

  return (
    <Table>
      <TableHeader>
        <Tr>
          {variantsNames.map((variant) => (
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
              <PositionToggle
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
            <Variant key={pos} variants={variantsNames} shared={presence} />
          ))}
        </>

        <Tr>
          <TdTitle colSpan={nCols}>{t('Other mutations')}</TdTitle>
        </Tr>

        <>
          {individualMutations.map(({ index, mutations }) => (
            <Variant key={index} variants={variantsNames} shared={mutations} />
          ))}
        </>
      </TableBody>
    </Table>
  )
}
