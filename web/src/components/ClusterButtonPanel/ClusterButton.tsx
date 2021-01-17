/* eslint-disable camelcase */
import React, { useMemo } from 'react'

import { Button, Col } from 'reactstrap'
import { ClusterDatum } from 'src/io/getClusters'
import styled from 'styled-components'

const ClusterCol = styled(Col)`
  display: flex;

  @media only screen and (min-width: 992px) {
    flex: 1 1 200px;
    flex-grow: 1;
    height: 50px;
    margin: 6px 10px;
  }

  @media only screen and (max-width: 992px) and (min-width: 500px) {
    flex: 1 0 150px;
    flex-grow: 0;
    height: 40px;
    margin: 3px 5px;
  }

  @media only screen and (max-width: 500px) {
    flex: 1 0 150px;
    flex-grow: 0;
    height: 32px;
    margin: 3px 3px;
  }
`

const ClusterButtonComponent = styled(Button)<{ $isCurrent: boolean; $color: string }>`
  width: 100%;

  display: flex;

  @media only screen and (min-width: 992px) {
    justify-content: left;
    padding: 0 3rem;
  }

  @media only screen and (max-width: 992px) and (min-width: 500px) {
    justify-content: center;
  }

  @media only screen and (max-width: 500px) {
    justify-content: center;
  }

  border: none;
  border-left: 30px solid ${(props) => props.$color};
  border-radius: 3px;
  cursor: pointer;

  box-shadow: ${({ $isCurrent, theme }) => ($isCurrent ? theme.shadows.normal : theme.shadows.light)};

  background-color: ${({ $isCurrent, theme }) => ($isCurrent ? theme.white : theme.gray100)};

  &:active,
  &:focus,
  &:hover {
    background-color: ${({ $isCurrent, theme }) => ($isCurrent ? theme.white : theme.gray100)};
  }
`

const ClusterTitle = styled.h1<{ $isCurrent: boolean }>`
  @media only screen and (max-width: 992px) {
    font-size: 1rem;
    margin: auto 3px;
  }

  font-weight: ${(props) => props.$isCurrent && 600};
  font-size: ${(props) => (props.$isCurrent ? '1.5rem' : '1.33rem')};
  margin: auto 5px;

  color: ${({ $isCurrent, theme }) => ($isCurrent ? theme.gray700 : theme.gray600)};
  text-decoration: none;

  &:active,
  &:focus,
  &:hover {
    color: ${(props) => props.theme.gray700};
    text-decoration: none;
  }
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
      <ClusterButtonComponent color="transparent" onClick={handleClick} $isCurrent={isCurrent} $color={col}>
        <ClusterTitle $isCurrent={isCurrent}>{display_name}</ClusterTitle>
      </ClusterButtonComponent>
    </ClusterCol>
  )
}
