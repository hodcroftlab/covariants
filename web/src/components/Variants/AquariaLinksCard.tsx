import React, { useMemo } from 'react'

import { styled } from 'styled-components'

import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'

import { useRecoilValue } from 'recoil'
import type { ClusterDatum } from 'src/io/getClusters'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { ProteinBadge as ProteinBadgeBase } from 'src/components/Common/Badges/ProteinBadge'

import AquariaLogo from 'src/assets/images/aquaria.svg'
import { enablePangolinAtom } from 'src/state/Nomenclature'
import { clusterDisplayNameToLineageMapSelector } from 'src/state/Clusters'

const AquariaLogoSmall = styled(AquariaLogo)`
  margin: auto 5px;
  width: 25px;
  height: 25px;
`

const AquariaLinksCardBody = styled(CardBody)`
  padding-top: 5px;
  padding-bottom: 5px;
`

const AquariaLinksCardHeading = styled.h1`
  display: inline;
  margin: auto 0;
  font-size: 1.2rem;
`

const ProteinBadge = styled(ProteinBadgeBase)`
  margin: 0.25rem;
`

export interface AquariaLinksCardProps {
  cluster: ClusterDatum
}

export function AquariaLinksCardTitle({ cluster }: AquariaLinksCardProps) {
  const { t } = useTranslationSafe()
  const enablePangolin = useRecoilValue(enablePangolinAtom)
  const pangoLineageMap = useRecoilValue(clusterDisplayNameToLineageMapSelector)
  const pangoName = pangoLineageMap.get(cluster.displayName) ?? cluster.displayName
  const variant = enablePangolin ? pangoName : cluster.displayName

  return (
    <span className="d-flex w-100">
      <AquariaLogoSmall />
      <AquariaLinksCardHeading>
        {t('Protein visualisation for {{variant}} by {{aquaria}}', {
          variant,
          aquaria: 'Aquaria',
        })}
      </AquariaLinksCardHeading>
    </span>
  )
}

export function AquariaLinksCard({ cluster }: AquariaLinksCardProps) {
  const proteinBadges = useMemo(
    () =>
      (cluster?.aquariaUrls ?? []).map(({ gene, url }) => (
        <LinkExternal key={gene} href={url} icon={null}>
          <ProteinBadge gene={gene} />
        </LinkExternal>
      )),
    [cluster.aquariaUrls],
  )

  const title = useMemo(() => <AquariaLinksCardTitle cluster={cluster} />, [cluster])

  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <AquariaLinksCardBody>
        <Row className={'gx-0'}>
          <Col>{proteinBadges}</Col>
        </Row>
      </AquariaLinksCardBody>
    </Card>
  )
}
