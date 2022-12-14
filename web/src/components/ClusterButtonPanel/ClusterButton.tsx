import React, { useCallback, useMemo } from 'react'
import { isEqual } from 'lodash'
import { useSetRecoilState } from 'recoil'
import { useRouter } from 'next/router'
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
  const { asPath } = useRouter()
  const { display_name, build_name } = cluster
  const setCurrentCluster = useSetRecoilState(currentClusterAtom)

  const isCurrent = useMemo(() => {
    return isEqual(asPath, `/variants/${build_name}`)
  }, [asPath, build_name])

  const onClick = useCallback(() => {
    setCurrentCluster(cluster)
  }, [cluster, setCurrentCluster])

  return <VariantLinkBadge name={display_name} $isCurrent={isCurrent} onClick={onClick} />
}
