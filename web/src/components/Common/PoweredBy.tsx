import React from 'react'

import { Col, Row } from 'reactstrap'
import gisaidLogoUrl from 'src/assets/images/gisaid_logo.png'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import styled from 'styled-components'

import { PROJECT_NAME, TEAM_NAME } from 'src/constants'
import { ReactComponent as VercelLogo } from 'src/assets/images/vercel_logo.svg'
import { ReactComponent as NextJsLogo } from 'src/assets/images/nextjs_logo.svg'
import { NextstrainLogo } from './NextstrainLogo'

const Flex = styled.section`
  max-width: 700px;
  //width: 100%;
`

const PoweredByH1 = styled.h1`
  font-size: 1.33rem;
  margin: 10px auto;
`

const Ul = styled.ul`
  list-style: none;
  padding: 0;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`

const Li = styled.li`
  flex: 1 0 150px;
  display: flex;
  width: 200px;
  height: 50px;
`

const Wrapper = styled.div`
  margin: auto;
`

const mainLinks = [
  {
    title: 'GISAID',
    url: `https://gisaid.org`,
    alt: 'Link to Gisaid.org, GISAID logo',
    icon: <img className="my-auto" src={gisaidLogoUrl} alt="GISAID logo" height={30} />,
  },
  {
    title: 'Nextstrain',
    url: `https://nextstrain.org?utm_source=${PROJECT_NAME}`,
    alt: 'Link to Nextstrain.org with colorful Nextstrain logo',
    icon: <NextstrainLogo />,
  },
  {
    title: 'Next.js',
    url: `https://nextjs.com?utm_source=${TEAM_NAME}&utm_campaign=oss`,
    alt: '',
    icon: <NextJsLogo height={30} />,
  },
  {
    title: 'Vercel',
    url: `https://vercel.com?utm_source=${TEAM_NAME}&utm_campaign=oss`,
    alt: '',
    icon: <VercelLogo width={100} />,
  },
]

export function PoweredBy() {
  return (
    <Row noGutters>
      <Col>
        <Row noGutters>
          <Col className="text-center">
            <PoweredByH1>{'Powered by'}</PoweredByH1>
          </Col>
        </Row>

        <Row noGutters>
          <Col className="d-flex">
            <Flex className="mx-auto">
              <Ul>
                {mainLinks.map(({ title, url, alt, icon }) => (
                  <Li key={title}>
                    <Wrapper>
                      <LinkExternal title={title} href={url} alt={alt} icon={null}>
                        {icon}
                      </LinkExternal>
                    </Wrapper>
                  </Li>
                ))}
              </Ul>
            </Flex>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
