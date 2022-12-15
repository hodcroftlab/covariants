import React, { useMemo, useState } from 'react'

import styled from 'styled-components'
import { Button } from 'reactstrap'

import type { ClusterDatum } from 'src/io/getClusters'
import { ClusterButton } from 'src/components/ClusterButtonPanel/ClusterButton'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'

const ClusterGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ClusterGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1 1;
`

const ClusterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1 0;
  margin: auto;
  justify-content: center;
`

const ShowMoreButton = styled(Button)`
  margin: 0 auto;
`

export interface ClusterButtonArrayProps {
  cluster: ClusterDatum
  isCurrent: boolean
  showNonImportant: boolean
}

export function ClusterButtonOptional({ cluster, isCurrent, showNonImportant }: ClusterButtonArrayProps) {
  const shouldShow = useMemo(
    // prettier-ignore
    () => cluster.important || showNonImportant || isCurrent,
    [cluster.important, isCurrent, showNonImportant],
  )

  if (!shouldShow) {
    return null
  }

  return <ClusterButton key={cluster.display_name} cluster={cluster} isCurrent={isCurrent} />
}

export interface ClusterButtonGroupProps {
  clusterGroup: ClusterDatum[]
  currentCluster?: ClusterDatum
}

export function ClusterButtonGroup({ clusterGroup, currentCluster }: ClusterButtonGroupProps) {
  const { t } = useTranslationSafe()

  const [showNonImportant, setShowNonImportant] = useState(false)
  const toggleShowNonImportant = useMemo(() => (_: unknown) => setShowNonImportant(!showNonImportant), [showNonImportant]); // prettier-ignore

  return (
    <ClusterGroupContainer>
      <ClusterGroupWrapper>
        <ClusterGroup>
          {clusterGroup.map((cluster) => (
            <ClusterButtonOptional
              key={cluster.build_name}
              cluster={cluster}
              isCurrent={cluster.display_name === currentCluster?.display_name}
              showNonImportant={showNonImportant}
            />
          ))}
        </ClusterGroup>
      </ClusterGroupWrapper>

      <ShowMoreButton type="button" color="link" onClick={toggleShowNonImportant}>
        {showNonImportant ? t('Show less') : t('Show more')}
      </ShowMoreButton>
    </ClusterGroupContainer>
  )
}
