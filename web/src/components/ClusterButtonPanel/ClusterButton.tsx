import React, { useCallback, useMemo } from 'react'
import { isEqual } from 'lodash'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import type { ClusterDatum } from 'src/io/getClusters'
import { currentClusterAtom } from 'src/state/Clusters'
import { VariantLinkBadge as VariantLinkBadgeBase } from 'src/components/Common/MutationBadge'

const VariantLinkBadge = styled(VariantLinkBadgeBase)<{ $isCurrent: boolean }>`
  @media (min-width: ${(props) => props.theme.grid.md}) {
    display: block;
  }

  transform: scale(1.2);
  margin-bottom: 0.5rem;

  opacity: ${(props) => !props.$isCurrent && 0.75};

  & > span {
    border-radius: 4px;
    border: ${(props) => (props.$isCurrent ? props.theme.green : 'transparent')} solid 1px;
  }

  &:hover {
    opacity: 1;
  }
`

export interface ClusterButtonProps {
  cluster: ClusterDatum
}

export function ClusterButton({ cluster }: ClusterButtonProps) {
  const { display_name } = cluster
  const [currentCluster, setCurrentCluster] = useRecoilState(currentClusterAtom)

  const isCurrent = useMemo(() => {
    return isEqual(cluster, currentCluster)
  }, [cluster, currentCluster])

  const onClick = useCallback(() => {
    setCurrentCluster(cluster)
  }, [cluster, setCurrentCluster])

  return <VariantLinkBadge name={display_name} $isCurrent={isCurrent} onClick={onClick} />
}
