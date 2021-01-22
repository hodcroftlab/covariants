import React from 'react'

import { Col, Row, Table } from 'reactstrap'
import { AminoacidMutationBadge } from 'src/components/Common/MutationBadge'

import type { MutationComparisonVariant } from 'src/io/getMutationComparison'
import { getMutationComparison } from 'src/io/getMutationComparison'

const mutationComparison = getMutationComparison()

export interface VariantProps {
  variant: MutationComparisonVariant
}

export function Variant({ variant }: VariantProps) {
  console.log({ variant })

  return (
    <tr>
      <td>{variant.variant}</td>

      {variant.nonsynonymous.map((mutation) => (
        <td key={mutation}>
          <AminoacidMutationBadge mutation={mutation} />
        </td>
      ))}
    </tr>
  )
}

export interface MutationComparisonProps {}

export function MutationComparison({}: MutationComparisonProps) {
  return (
    <Row noGutters>
      <Col>
        <Table>
          <tbody>
            {mutationComparison.map((variant) => (
              <Variant key={variant.variant} variant={variant} />
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  )
}
