import React from 'react'
import styled from 'styled-components'
import { Var, WhoBadge } from 'src/components/Common/MutationBadge'
import { LinkSmart } from 'src/components/Link/LinkSmart'
import { useClusters } from 'src/io/getClusters'
import { GREEK_ALPHABET } from 'src/names'

const domain = process.env.DOMAIN ?? ''

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Heading = styled.h3`
  flex: 0;
  height: 40px;
  text-align: center;
`

const Content = styled.div`
  flex: 1 1 100%;
  display: flex;
  overflow: auto;
`

const Box = styled.div`
  min-height: min-content;
  display: flex;
`

const JsonText = styled.pre`
  flex: 1;
  color: #222;
  background-color: #ccc;
  overflow: auto;
  font-size: 0.8rem;
  max-width: 700px;
  margin: 0;
`

const Ul = styled.ul`
  flex: 1 1 100%;
  list-style: none;
  padding: 1rem;
  margin: 0;

  & > li {
    padding: 0.25rem;
  }
`

export default function DebugBadges() {
  const clusters = useClusters()

  return (
    <Container>
      <Main>
        <Heading>{'Display names'}</Heading>
        <Content>
          <Box>
            <Ul>
              {clusters.map(({ display_name }) => (
                <li key={display_name}>
                  <Var name={display_name} />
                </li>
              ))}
            </Ul>
          </Box>
        </Content>
      </Main>

      <Main>
        <Heading>{'Build names'}</Heading>
        <Content>
          <Box>
            <Ul>
              {clusters.map(({ build_name }) => {
                const url = `${domain}/variants/${build_name}`
                return (
                  <li key={build_name}>
                    <LinkSmart href={url}>{build_name}</LinkSmart>
                  </li>
                )
              })}
            </Ul>
          </Box>
        </Content>
      </Main>

      <Main>
        <Heading>{'Greek letters'}</Heading>
        <Content>
          <Box>
            <Ul>
              {Object.keys(GREEK_ALPHABET).map((letter) => (
                <li key={letter}>
                  <WhoBadge name={letter} />
                </li>
              ))}
            </Ul>
          </Box>
        </Content>
      </Main>

      <Main>
        <Heading>{'Clusters JSON'}</Heading>
        <Content>
          <Box>
            <JsonText>{JSON.stringify({ clusters }, null, 2)}</JsonText>
          </Box>
        </Content>
      </Main>
    </Container>
  )
}
