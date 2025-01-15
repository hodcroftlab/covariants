import React from 'react'
import { Col, Row } from 'reactstrap'
import { styled } from 'styled-components'
import { NextstrainLogo } from './NextstrainLogo'
import { PROJECT_NAME, TEAM_NAME } from 'src/constants'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import VercelLogo from 'src/assets/images/vercel_logo.svg'
import NextJsLogo from 'src/assets/images/nextjs_logo.svg'

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
  const { t } = useTranslationSafe()

  return (
    <Row className={'gx-0'}>
      <Col>
        <Row className={'gx-0'}>
          <Col className="text-center">
            <PoweredByH1>{t('Powered by')}</PoweredByH1>
          </Col>
        </Row>

        <Row className={'gx-0'}>
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
