import React from 'react'

import { Col, Row } from 'reactstrap'
import { Var, WhoBadge } from 'src/components/Common/MutationBadge'

import { LinkSmart } from 'src/components/Link/LinkSmart'

import { getClusterNames, getClusterBuildNames, getClusterOldBuildNames } from 'src/io/getClusters'
import { GREEK_ALPHABET } from 'src/names'

const clusterNames = getClusterNames()
const clusterBuildNames = getClusterBuildNames()
const clusterOldBuildNames = getClusterOldBuildNames()

const domain = process.env.DOMAIN ?? ''

export default function DebugBadges() {
  return (
    <>
      <Row noGutters>
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
      <Row noGutters>
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
    </>
  )
}
