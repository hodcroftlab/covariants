import React, { ReactNode } from 'react'
import { Card, CardBody, Col, Form } from 'reactstrap'
import styled from 'styled-components'

import { useMobile } from 'src/helpers/useMediaQuery'
import { StickyRow } from './StickyRow'
import { MobileSheet } from './MobileSheet'

export interface StickyToolbarProps {
  children?: ReactNode | undefined
}

export const ToolbarGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;

  * + & {
    margin-top: 1rem;

    @media (min-width: 768px) {
      margin-top: 0;
      margin-left: 1rem;
      padding-left: 1rem;
      border-left: 1px solid;
      border-color: hsl(0, 0%, 80%);
    }
  }
`

const ToolbarContainer = styled(StickyRow)`
  max-width: fit-content;
  margin-left: auto;
`

const ToolbarForm = styled(Form)`
  flex-wrap: nowrap;
`

const ToolbarCardBody = styled(CardBody)`
  overflow-x: auto;
`

export function StickyToolbar({ children }: StickyToolbarProps) {
  const isMobile = useMobile()

  if (isMobile) {
    return (
      <MobileSheet label="Toolbar">
        <Form>{children}</Form>
      </MobileSheet>
    )
  }

  return (
    <ToolbarContainer noGutters className="mb-3 pt-2 mt-n2">
      <Col>
        <Card>
          <ToolbarCardBody className="px-3 py-2">
            <ToolbarForm inline>{children}</ToolbarForm>
          </ToolbarCardBody>
        </Card>
      </Col>
    </ToolbarContainer>
  )
}
