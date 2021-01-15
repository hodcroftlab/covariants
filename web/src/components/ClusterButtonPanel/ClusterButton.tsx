/* eslint-disable camelcase */
import React, { useMemo } from 'react'

import { Button, Col, Row } from 'reactstrap'
import { ClusterDatum } from 'src/io/getClusters'
import styled from 'styled-components'

const ClusterCol = styled(Col)`
  flex-grow: 0;
`

const ClusterButtonCol = styled(Col)`
  height: 50px;
  justify-content: center;
`

const ClusterButtonComponent = styled(Button)<{ $isCurrent: boolean }>`
  min-width: 220px;
  max-width: 400px;
  margin: 6px 10px;
  padding: 0;
  box-shadow: ${(props) => props.theme.shadows.normal};
  border-radius: 3px;
  cursor: pointer;

  background: ${({ $isCurrent, theme }) => ($isCurrent ? theme.white : theme.gray200)};

  &:active,
  &:focus,
  &:hover {
    box-shadow: ${(props) => props.theme.shadows.normal};
    background: ${({ $isCurrent, theme }) => ($isCurrent ? theme.white : theme.gray300)};
  }
`

const ColorPill = styled.div<{ $color: string }>`
  background-color: ${(props) => props.$color};
  width: 30px;
  height: 100%;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
`

const ClusterTitle = styled.h1<{ $isCurrent: boolean }>`
  font-size: ${(props) => (props.$isCurrent ? '1.5rem' : '1.33rem')};
  margin: auto;
  font-weight: ${(props) => props.$isCurrent && 600};
`

export interface ClusterButtonProps {
  cluster: ClusterDatum
  onClick(cluster: string): void
  isCurrent: boolean
}

export function ClusterButton({ cluster, onClick, isCurrent }: ClusterButtonProps) {
  const { display_name, col } = cluster
  const handleClick = useMemo(() => () => onClick(display_name), [display_name, onClick])

  return (
    <ClusterCol>
      <ClusterButtonComponent onClick={handleClick} $isCurrent={isCurrent}>
        <Row noGutters>
          <ClusterButtonCol className="d-flex">
            <ColorPill $color={col} />
            <ClusterTitle $isCurrent={isCurrent}>{display_name}</ClusterTitle>
          </ClusterButtonCol>
        </Row>
      </ClusterButtonComponent>
    </ClusterCol>
  )
}
