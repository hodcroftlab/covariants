import React from 'react'

import { Col, Container, Row } from 'reactstrap'
import styled from 'styled-components'

import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { MdxContent } from 'src/i18n/getMdxContent'
import { Editable, CenteredEditable } from 'src/components/Common/Editable'
import { Layout } from 'src/components/Layout/Layout'
import { SharedMutations } from './SharedMutations'
import { PageHeading } from '../Common/PageHeading'

export const SharedMutationsPageContainer = styled(Container)`
  max-width: 1200px;
`

export const SharedMutationsWrapper = styled.div`
  display: block;
  flex: 0;
  overflow-x: auto;
`

export const SharedMutationsWrapperInner = styled.div`
  flex: 1;
`

export function SharedMutationsPage() {
  const { t } = useTranslationSafe()

  return (
    <Layout>
      <SharedMutationsPageContainer>
        <Row noGutters>
          <Col>
            <PageHeading>{t('Shared mutations')}</PageHeading>
          </Col>
        </Row>

        <Row noGutters>
          <Col>
            <CenteredEditable githubUrl="blob/master/content/SharedMutations.md">
              <MdxContent filepath="SharedMutations.md" />
            </CenteredEditable>
          </Col>
        </Row>

        <Row noGutters>
          <Col className="pb-10">
            <Editable githubUrl="blob/master/scripts" text={t('View data generation scripts')}>
              <SharedMutationsWrapper>
                <SharedMutations />
              </SharedMutationsWrapper>
            </Editable>
          </Col>
        </Row>
      </SharedMutationsPageContainer>
    </Layout>
  )
}
