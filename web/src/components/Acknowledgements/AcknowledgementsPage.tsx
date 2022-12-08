import React, { useMemo } from 'react'
import { get } from 'lodash'
import styled from 'styled-components'
import { Col, Container, Row } from 'reactstrap'
import { useAxiosQuery } from 'src/hooks/useAxiosQuery'
import { getClusters } from 'src/io/getClusters'
import { AcknowledgementsCard, AcknowledgementsKeysJson } from 'src/components/Acknowledgements/AcknowledgementsCard'
import { PageHeading } from 'src/components/Common/PageHeading'
import AcknowledgementsContent from './AcknowledgementsContent.md'

export const AcknowledgementsPageContainer = styled(Container)`
  max-width: 1200px;
  padding: 0 0.5rem;
`

const clusters = getClusters()

export function useQueryAcknowledgementsKeys() {
  const data = useAxiosQuery('/acknowledgements/acknowledgements_keys.json')
  return useMemo(() => {
    const json = data as AcknowledgementsKeysJson
    return clusters.map((cluster) => {
      const { numChunks } = get(json.acknowledgements, cluster.build_name, { numChunks: 0 })
      return { cluster, numChunks }
    })
  }, [data])
}

export function AcknowledgementsPage() {
  const data = useQueryAcknowledgementsKeys()

  const body = useMemo(() => {
    return data.map((datum) => (
      <AcknowledgementsCard key={datum.cluster.build_name} cluster={datum.cluster} numPages={datum.numChunks} />
    ))
  }, [data])

  return (
    <AcknowledgementsPageContainer>
      <Row>
        <Col>
          <PageHeading>{'Acknowledgements'}</PageHeading>
        </Col>
      </Row>

      <Row>
        <Col>
          <AcknowledgementsContent />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>{body}</Col>
      </Row>
    </AcknowledgementsPageContainer>
  )
}
