import React, { useMemo } from 'react'

import styled from 'styled-components'

import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'

import type { ClusterDatum } from 'src/io/getClusters'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { ProteinBadge as ProteinBadgeBase } from 'src/components/Common/MutationBadge'

import AquariaLogo from 'src/assets/images/aquaria.svg'

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

  return (
    <span className="d-flex w-100">
      <AquariaLogoSmall />
      <AquariaLinksCardHeading>
        {t('Protein visualisation for {{variant}} by {{aquaria}}', {
          variant: cluster.display_name,
          aquaria: 'Aquaria',
        })}
      </AquariaLinksCardHeading>
    </span>
  )
}

export function AquariaLinksCard({ cluster }: AquariaLinksCardProps) {
  const proteinBadges = useMemo(
    () =>
      (cluster?.aquaria_urls ?? []).map(({ gene, url }) => (
        <LinkExternal key={gene} href={url} icon={null}>
          <ProteinBadge gene={gene} />
        </LinkExternal>
      )),
    [cluster.aquaria_urls],
  )

  const title = useMemo(() => <AquariaLinksCardTitle cluster={cluster} />, [cluster])

  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <AquariaLinksCardBody>
        <Row noGutters>
          <Col>{proteinBadges}</Col>
        </Row>
      </AquariaLinksCardBody>
    </Card>
  )
}
