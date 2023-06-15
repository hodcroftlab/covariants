import React, { ReactNode } from 'react'
import { Card, CardBody, Col, Form, Row } from 'reactstrap'
import styled from 'styled-components'
import { StickyRow } from './StickyRow'

export interface StickyToolbarProps {
  children?: ReactNode | undefined
}

export const ToolbarGroup = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;

  * + & {
    padding-left: 1rem;
    border-left: 1px solid;
    border-color: hsl(0, 0%, 80%);
  }
`

const formStyle = {
  gap: '1rem',
  flexWrap: 'nowrap',
  overflowX: 'auto',
}

export function StickyToolbar({ children }: StickyToolbarProps) {
  return (
    <StickyRow noGutters className="pt-2 mt-n2 mb-n3">
      <Col>
        <Card style={{ maxWidth: 'fit-content', marginLeft: 'auto' }}>
          <CardBody className="px-3 py-2 d-flex">
            <Form inline style={formStyle}>
              {children}
            </Form>
          </CardBody>
        </Card>
      </Col>
    </StickyRow>
  )
}
