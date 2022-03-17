/* eslint-disable camelcase */
import React from 'react'

import { ClusterDatum } from 'src/io/getClusters'
import styled from 'styled-components'
import { Link } from '../Link/Link'

const ClusterButtonComponent = styled(Link)<{ $isCurrent: boolean; $color: string }>`
  display: flex;
  width: 200px;
  height: 55px;
  margin: 3px;

  border: none;
  border-left: 30px solid ${(props) => props.$color};
  border-radius: 3px;
  cursor: pointer;

  box-shadow: ${({ $isCurrent, theme }) => ($isCurrent ? theme.shadows.normal : theme.shadows.light)};
  background-color: ${({ $isCurrent, theme }) => ($isCurrent ? theme.white : theme.gray100)};
  text-decoration: none;

  &:active,
  &:focus,
  &:hover {
    text-decoration: none;
  }

  @media (min-width: 992px) {
  }

  @media (max-width: 991.98px) {
    width: 180px;
    height: 45px;
  }

  @media (max-width: 767.98px) {
    width: 160px;
    height: 40px;
  }

  @media (max-width: 575.98px) {
    width: 150px;
    height: 32px;
  }
`

const ClusterTitle = styled.h2<{ $isCurrent: boolean }>`
  font-family: ${(props) => props.theme.font.monospace};
  font-size: 1rem;

  @media (max-width: 991.98px) {
    font-size: 0.8rem;
    margin: auto 7px;
  }

  @media (max-width: 767.98px) {
    font-size: 0.75rem;
    margin: auto 5px;
  }

  @media (max-width: 575.98px) {
    font-size: 0.7rem;
    margin: auto 4px;
  }

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
  isCurrent: boolean
}

export function ClusterButton({ cluster, isCurrent }: ClusterButtonProps) {
  const { display_name, col, build_name } = cluster

  return (
    <ClusterButtonComponent href={`/variants/${build_name}`} $isCurrent={isCurrent} $color={col}>
      <ClusterTitle $isCurrent={isCurrent}>{display_name}</ClusterTitle>
    </ClusterButtonComponent>
  )
}
