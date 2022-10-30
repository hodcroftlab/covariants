import React, { ReactNode } from 'react'
import { Card, CardBody, Col, Form } from 'reactstrap'
import { StickyRow } from './StickyRow'

export interface StickyToolbarProps {
  children?: ReactNode | undefined
}

export function StickyToolbar({ children }: StickyToolbarProps) {
  return (
    <StickyRow>
      <Col>
        <Card className="m-2">
          <CardBody className="px-3 py-2">
            <Form inline>{children}</Form>
          </CardBody>
        </Card>
      </Col>
    </StickyRow>
  )
}
