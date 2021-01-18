import React from 'react'

import { Col, Row } from 'reactstrap'
import styled from 'styled-components'

import { LinkExternal } from 'src/components/Link/LinkExternal'
import { FaGithub, FaTwitter } from 'react-icons/fa'

const Flex = styled.section`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 10px auto;
`

const TeamCreditsH1 = styled.h1`
  font-size: 1.33rem;
  margin: 15px auto;
`

const Ul = styled.ul`
  list-style: none;
  padding: 0;

  margin-top: 0.5rem;
`

const Li = styled.li`
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
`

const NameText = styled.h2`
  font-size: 1.1rem;
`

const AfilliationText = styled.small`
  font-size: 0.8rem;
`

const Portrait = styled.img`
  margin: 0 auto;
  width: 100px;
  border-radius: 100px;
`

const mainLinks = [
  {
    title: 'Twitter',
    url: `https://twitter.com/firefoxx66`,
    alt: 'Link to Twitter, with blue Twitter bird logo',
    icon: <FaTwitter size={25} color="#08a0e9" />,
  },
  {
    title: 'GitHub',
    url: 'https://github.com/emmahodcroft',
    alt: 'Link to Github page, with grey Github Octocat logo',
    icon: <FaGithub size={25} color="#24292E" />,
  },
]

export function TeamCredits() {
  return (
    <Row noGutters>
      <Col>
        <Row noGutters>
          <Col className="d-flex text-center">
            <TeamCreditsH1>{'CoVariants is brought to you by'}</TeamCreditsH1>
          </Col>
        </Row>

        <Row noGutters>
          <Col className="d-flex text-center">
            <Flex>
              <Portrait src="https://avatars3.githubusercontent.com/u/14290674?s=400&u=e074280fd3dd9a9b0e583af5f17d3a69f3068f8b&v=4" />
              <NameText>{'Emma Hodcroft, PhD'}</NameText>
              <AfilliationText>{'Institute of Social and Preventive Medicine'}</AfilliationText>
              <AfilliationText>{'University of Bern, Bern, Switzerland'}</AfilliationText>

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
