import React from 'react'
import { SiNextDotJs } from 'react-icons/all'

import { Col, Row } from 'reactstrap'
import gisaidLogoUrl from 'src/assets/images/gisaid_logo.png'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import styled from 'styled-components'

import { ReactComponent as NextstrainLogo } from 'src/assets/images/nextstrain_logo.svg'
import { ReactComponent as VercelLogo } from 'src/assets/images/vercel_logo.svg'
import { ReactComponent as NextJsLogo } from 'src/assets/images/nextjs_logo.svg'

const Flex = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px auto;
`

const PoweredByH1 = styled.h1`
  font-size: 1.5rem;
  margin: 15px auto;
`

const Ul = styled.ul`
  margin: 0 auto;
  list-style: none;
  padding: 0;
`

const Li = styled.li`
  display: inline-block;
  margin: 0 10px;
`

const mainLinks = [
  {
    title: 'GISAID',
    url: `https://gisaid.org`,
    alt: 'Link to Gisaid.org, GISAID logo',
    icon: <img className="my-auto" src={gisaidLogoUrl} alt="GISAID logo" height={30} />,
  },
  {
    title: 'Nexstrain',
    url: 'https://nextstrain.org',
    alt: 'Link to Nextstrain.org with colorful Nextstrain logo',
    icon: <NextstrainLogo width={30} height={30} />,
  },
  {
    title: 'Next.js',
    url: 'https://nextjs.com',
    alt: '',
    icon: <NextJsLogo height={30} />,
  },
  {
    title: 'Vercel',
    url: 'https://vercel.com',
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
          <Col>
            <Flex>
              <Ul>
                {mainLinks.map(({ title, url, alt, icon }) => (
                  <Li key={title}>
                    <LinkExternal title={title} href={url} alt={alt} icon={null}>
                      {icon}
                    </LinkExternal>
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
