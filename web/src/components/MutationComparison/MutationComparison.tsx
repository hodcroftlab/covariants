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
  width: 60px;
  height: 2rem;
  border: #7b838a solid 1px;
`

const Td = styled.td`
  border: #7b838a solid 1px;
`

const Tr = styled.tr`
  text-align: center;
`

export interface VariantProps {
  variants: string[]
  presence: MutationComparisonPresence
}

export function Variant({ variants, presence }: VariantProps) {
  return (
    <Tr>
      {presence.presence.map((isPresent, i) => (
        <Td key={variants[i]}>{isPresent && <AminoacidMutationBadge mutation={presence.mutation} />}</Td>
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
              <Variant key={presence.mutation} variants={variants} presence={presence} />
            ))}
          </TableBody>
        </Table>
      </Col>
    </Row>
  )
}
