import axios from 'axios'
import React from 'react'

import { get } from 'lodash'
import Loader from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { AcknowledgementsError } from 'src/components/Acknowledgements/AcknowledgementsError'
import styled from 'styled-components'
import { Col, Container, Row } from 'reactstrap'

import { getClusters } from 'src/io/getClusters'
import { Layout } from 'src/components/Layout/Layout'
import { AcknowledgementsCard, AcknowledgementsKeysJson } from 'src/components/Acknowledgements/AcknowledgementsCard'

import AcknowledgementsContent from './AcknowledgementsContent.md'

export const AcknowledgementsPageContainer = styled(Container)`
  max-width: 1200px;
  padding: 0 0.5rem;
`

const clusters = getClusters()

export function useQueryAcknowledgementsKeys() {
  return useQuery(
    ['acknowledgements_keys'],
    async () => {
      const url = '/acknowledgements/acknowledgements_keys.json'
      const res = await axios.get(url)
      if (!res.data) {
        throw new Error(`Unable to fetch acknowledgement keys data: request to URL "${url}" resulted in no data`)
      }
      const json = res.data as AcknowledgementsKeysJson
      return clusters.map((cluster) => {
        const { numChunks } = get(json.acknowledgements, cluster.build_name, { numChunks: 0 })
        return { cluster, numChunks }
      })
    },
    {
      staleTime: Number.POSITIVE_INFINITY,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: Number.POSITIVE_INFINITY,
    },
  )
}

export function AcknowledgementsPage() {
  const { isLoading, isFetching, isError, data, error } = useQueryAcknowledgementsKeys()

  return (
    <Layout>
      <AcknowledgementsPageContainer>
        <Row>
          <Col>
            <h1 className="text-center">{'Acknowledgements'}</h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <AcknowledgementsContent />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            {(isLoading || isFetching) && (
              <div className="d-flex">
                <div className="mx-auto">
                  <Loader type="Oval" color="#777" height={100} width={50} timeout={3000} />
                </div>
              </div>
            )}
            {isError && error && <AcknowledgementsError error={error} />}
            {data &&
              data.map((datum) => (
                <AcknowledgementsCard
                  key={datum.cluster.build_name}
                  cluster={datum.cluster}
                  numPages={datum.numChunks}
                />
              ))}
          </Col>
        </Row>
      </AcknowledgementsPageContainer>
    </Layout>
  )
}
