import React, { Suspense } from 'react'

import { Col, Container, Row } from 'reactstrap'
import { styled } from 'styled-components'

import { ErrorBoundary } from 'react-error-boundary'
import { PageHeading } from '../Common/PageHeading'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { MdxContent } from 'src/i18n/getMdxContent'
import { Editable, CenteredEditable } from 'src/components/Common/Editable'
import { Layout } from 'src/components/Layout/Layout'
import { LOADING } from 'src/components/Loading/Loading'
import { FetchError } from 'src/components/Error/FetchError'
import { SharedMutationsTable } from 'src/components/SharedMutations/SharedMutationsTable'

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
        <Row className={'gx-0'}>
          <Col>
            <PageHeading>{t('Shared mutations')}</PageHeading>
          </Col>
        </Row>

        <Row className={'gx-0'}>
          <Col>
            <CenteredEditable githubUrl="blob/master/content/SharedMutations.md">
              <MdxContent filepath="SharedMutations.md" />
            </CenteredEditable>
          </Col>
        </Row>

        <Row className={'gx-0'}>
          <Col className="pb-10">
            <Editable githubUrl="blob/master/scripts" text={t('View data generation scripts')}>
              <SharedMutationsWrapper>
                <ErrorBoundary FallbackComponent={FetchError}>
                  <Suspense fallback={LOADING}>
                    <SharedMutationsTable />
                  </Suspense>
                </ErrorBoundary>
              </SharedMutationsWrapper>
            </Editable>
          </Col>
        </Row>
      </SharedMutationsPageContainer>
    </Layout>
  )
}
