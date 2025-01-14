import React from 'react'

import { Col, Row } from 'reactstrap'
import { Var, WhoBadge } from 'src/components/Common/MutationBadge'

import { Layout } from 'src/components/Layout/Layout'
import { LinkSmart } from 'src/components/Link/LinkSmart'

import { useClusterNames, useClusterBuildNames, useClusterOldBuildNames } from 'src/io/getClusters'
import { GREEK_ALPHABET } from 'src/names'

const domain = process.env.DOMAIN ?? ''

export default function DebugBadges() {
  const clusterNames = useClusterNames()
  const clusterBuildNames = useClusterBuildNames()
  const clusterOldBuildNames = useClusterOldBuildNames()
  return (
    <Layout>
      <Row className={'gx-0'}>
        <Col>
          {'Display names'}
          <ul>
            {clusterNames.map((name) => (
              <li key={name}>
                <Var name={name} />
              </li>
            ))}
          </ul>
        </Col>

        <Col>
          {'Build names'}
          <ul>
            {clusterBuildNames.map((buildName) => {
              const url = `${domain}/variants/${buildName}`
              return (
                <li key={buildName}>
                  <LinkSmart href={url}>{url}</LinkSmart>
                </li>
              )
            })}
          </ul>
        </Col>

        <Col>
          {'Old build names'}
          <ul>
            {clusterOldBuildNames.map((oldBuildName) => {
              const url = `${domain}/variants/${oldBuildName}`
              return (
                <li key={oldBuildName}>
                  <LinkSmart href={url}>{url}</LinkSmart>
                </li>
              )
            })}
          </ul>
        </Col>
      </Row>
      <Row className={'gx-0'}>
        <Col>
          <ul>
            {Object.keys(GREEK_ALPHABET)
              .map((name) => name[0].toUpperCase() + name.slice(1))
              .map((name) => {
                return (
                  <li key={name}>
                    <WhoBadge name={name} />
                  </li>
                )
              })}
          </ul>
        </Col>
      </Row>
    </Layout>
  )
}
