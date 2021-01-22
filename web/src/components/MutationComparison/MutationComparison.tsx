import React from 'react'

import { Col, Row } from 'reactstrap'
import styled from 'styled-components'

import type { MutationComparisonPresence } from 'src/io/getMutationComparison'
import { getMutationComparisonVariants, getMutationComparisonPresence } from 'src/io/getMutationComparison'
import { AminoacidMutationBadge } from 'src/components/Common/MutationBadge'

const variants = getMutationComparisonVariants()
const presences = getMutationComparisonPresence()

const Table = styled.table`
  border: #7b838a solid 1px;
`

const TableHeader = styled.thead`
  border: #7b838a solid 1px;
`

const TableBody = styled.tbody``

const Th = styled.th`
  width: 120px;
  height: 2.5rem;
  border: #7b838a solid 1px;
`

const Td = styled.td`
  border: #7b838a solid 1px;
`

const Tr = styled.tr`
  text-align: center;

  &:nth-child(odd) {
    background-color: ${(props) => props.theme.gray200};
  }
`

export interface VariantProps {
  variants: string[]
  presence: MutationComparisonPresence
}

export function Variant({ variants, presence }: VariantProps) {
  return (
    <Tr>
      {presence.presence.map((mutation, i) => (
        <Td key={`${variants[i]} ${mutation ?? ''}`}>{mutation && <AminoacidMutationBadge mutation={mutation} />}</Td>
      ))}
    </Tr>
  )
}

export function MutationComparison() {
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
            {presences.map((presence) => (
              <Variant key={presence.pos} variants={variants} presence={presence} />
            ))}
          </TableBody>
        </Table>
      </Col>
    </Row>
  )
}
