import React from 'react'

import { Col, Row } from 'reactstrap'
import styled from 'styled-components'

import type { MutationShared } from 'src/io/getMutationComparison'
import {
  getMutationComparisonVariants,
  getMutationComparisonShared,
  getMutationComparisonIndividual,
} from 'src/io/getMutationComparison'
import { AminoacidMutationBadge } from 'src/components/Common/MutationBadge'

const variants = getMutationComparisonVariants()
const shared = getMutationComparisonShared()
const individual = getMutationComparisonIndividual()

const Table = styled.table``

const TableHeader = styled.thead`
  border: #7b838a solid 1px;
`

const TableBody = styled.tbody``

const Th = styled.th`
  width: 120px;
  height: 2.5rem;
  border: ${(props) => props.theme.gray500} solid 1px;
`

const Td = styled.td`
  border: ${(props) => props.theme.gray500} solid 1px;
`

const TdTitle = styled(Td)`
  height: 2.5rem;
`

const Tr = styled.tr`
  text-align: center;

  &:nth-child(odd) {
    background-color: ${(props) => props.theme.gray200};
  }
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

export function MutationComparison() {
  const nCols = variants.length

  return (
    <Row noGutters>
      <Col>
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
              <TdTitle colSpan={nCols}>{'Shared mutations'}</TdTitle>
            </Tr>

            <>
              {shared.map((shared) => (
                <Variant key={shared.pos} variants={variants} shared={shared} />
              ))}
            </>

            <Tr>
              <TdTitle colSpan={nCols}>{'Individual mutations'}</TdTitle>
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
      </Col>
    </Row>
  )
}
